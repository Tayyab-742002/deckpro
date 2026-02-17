import type { Handler, HandlerEvent } from "@netlify/functions";
import { Resend } from "resend";
import { v2 as cloudinary } from "cloudinary";

/* ─── CONFIG ─── */

const resend = new Resend(process.env.RESEND_API_KEY);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@deckpromarine.com.au";

/* ─── TYPES ─── */

interface FormPayload {
    formData: {
        name: string;
        phone: string;
        email: string;
        address: string;
        serviceType: string;
        boatLocation?: string;
        boatMake?: string;
        boatModel?: string;
        boatSize?: string;
        boatReady?: string;
        vehicleLocation?: string;
        vehicleMake?: string;
        vehicleModel?: string;
        vehicleType?: string;
        vehicleReady?: string;
        scanType?: string;
        scanLocation?: string;
        scanDetails?: string;
        dimensions: string;
        cleaning: string;
        message: string;
    };
    photoUrls: string[];
    logoUrls: string[];
}

/* ─── EMAIL TEMPLATE ─── */

function buildEmailHTML(data: FormPayload): string {
    const { formData, photoUrls, logoUrls } = data;

    const serviceLabels: Record<string, string> = {
        marine: "Marine Flooring",
        camper: "Campers & 4x4",
        scanning: "Precision Scanning",
    };

    /** Helper to build a detail row */
    const row = (label: string, value: string | undefined) =>
        value
            ? `<tr>
           <td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
           <td style="padding:6px 0;color:#1a2f45;font-size:13px;font-weight:500;">${value}</td>
         </tr>`
            : "";

    /** Build service-specific rows */
    let serviceRows = "";
    if (formData.serviceType === "marine") {
        serviceRows = `
      ${row("Boat Make", formData.boatMake)}
      ${row("Boat Model", formData.boatModel)}
      ${row("Boat Size", formData.boatSize)}
      ${row("Boat Location", formData.boatLocation)}
      ${row("Ready for Scanning", formData.boatReady)}
    `;
    } else if (formData.serviceType === "camper") {
        serviceRows = `
      ${row("Vehicle Make", formData.vehicleMake)}
      ${row("Vehicle Model", formData.vehicleModel)}
      ${row("Vehicle Type", formData.vehicleType)}
      ${row("Vehicle Location", formData.vehicleLocation)}
      ${row("Ready for Scanning", formData.vehicleReady)}
    `;
    } else if (formData.serviceType === "scanning") {
        serviceRows = `
      ${row("Scan Type", formData.scanType)}
      ${row("Scan Location", formData.scanLocation)}
      ${row("Scan Details", formData.scanDetails)}
    `;
    }

    /** Photo thumbnails grid */
    const photoGrid = photoUrls.length
        ? photoUrls
            .map(
                (url, i) => `
        <td style="padding:4px;width:50%;">
          <a href="${url}" target="_blank" style="display:block;text-decoration:none;">
            <img src="${url.replace("/upload/", "/upload/c_fill,w_280,h_200,q_auto,f_auto/")}" 
                 alt="Photo ${i + 1}" 
                 style="width:100%;border-radius:8px;display:block;" />
          </a>
          <a href="${url}" target="_blank" 
             style="display:inline-block;margin-top:4px;font-size:11px;color:#3b82f6;text-decoration:none;">
            View Full Size →
          </a>
        </td>`
            )
            .reduce((rows, cell, i) => {
                if (i % 2 === 0) rows.push([cell]);
                else rows[rows.length - 1].push(cell);
                return rows;
            }, [] as string[][])
            .map((pair) => `<tr>${pair.join("")}</tr>`)
            .join("")
        : "";

    /** Logo thumbnails */
    const logoSection = logoUrls.length
        ? `
      <div style="margin-top:24px;">
        <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;margin:0 0 8px 0;font-weight:600;">Logos & Lettering</p>
        ${logoUrls
            .map(
                (url) => `
          <a href="${url}" target="_blank" style="display:inline-block;margin-right:8px;margin-bottom:8px;">
            <img src="${url.replace("/upload/", "/upload/c_fit,w_120,h_80,q_auto,f_auto/")}" 
                 alt="Logo file" 
                 style="border-radius:6px;border:1px solid #e2e8f0;" />
          </a>`
            )
            .join("")}
      </div>`
        : "";

    const date = new Date().toLocaleDateString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Australia/Perth",
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1a2f45;padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#ffffff;opacity:0.5;">New Enquiry</p>
              <h1 style="margin:4px 0 0;font-size:20px;color:#ffffff;font-weight:600;">Deckpro Marine Flooring</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <!-- Customer Info -->
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;margin:0 0 12px 0;font-weight:600;">Customer Details</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${row("Name", formData.name)}
                ${row("Phone", formData.phone)}
                ${row("Email", formData.email)}
                ${row("Address", formData.address)}
              </table>

              <hr style="border:none;border-top:1px solid #f1f5f9;margin:0 0 24px 0;" />

              <!-- Service -->
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;margin:0 0 12px 0;font-weight:600;">
                Service: ${serviceLabels[formData.serviceType] || formData.serviceType}
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${serviceRows}
              </table>

              <hr style="border:none;border-top:1px solid #f1f5f9;margin:0 0 24px 0;" />

              <!-- Shared Fields -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${row("Cleaning Confirmed", formData.cleaning)}
                ${row("Dimensions", formData.dimensions)}
              </table>

              <!-- Message -->
              ${formData.message
            ? `
              <hr style="border:none;border-top:1px solid #f1f5f9;margin:0 0 24px 0;" />
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;margin:0 0 8px 0;font-weight:600;">Message</p>
              <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;background:#f8fafc;padding:12px 16px;border-radius:8px;">${formData.message}</p>
              `
            : ""
        }

              ${logoSection}

              <!-- Photos -->
              ${photoUrls.length
            ? `
              <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0;" />
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;margin:0 0 12px 0;font-weight:600;">Uploaded Photos (${photoUrls.length})</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${photoGrid}
              </table>
              `
            : ""
        }

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #f1f5f9;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                Submitted via deckpromarine.com.au &nbsp;·&nbsp; ${date}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── PLAIN TEXT VERSION (anti-spam best practice) ─── */

function buildPlainText(data: FormPayload): string {
    const { formData, photoUrls, logoUrls } = data;

    const serviceLabels: Record<string, string> = {
        marine: "Marine Flooring",
        camper: "Campers & 4x4",
        scanning: "Precision Scanning",
    };

    let text = `NEW ENQUIRY — Deckpro Marine Flooring\n`;
    text += `${"=".repeat(45)}\n\n`;

    text += `CUSTOMER DETAILS\n`;
    text += `Name: ${formData.name}\n`;
    text += `Phone: ${formData.phone}\n`;
    text += `Email: ${formData.email}\n`;
    text += `Address: ${formData.address}\n\n`;

    text += `SERVICE: ${serviceLabels[formData.serviceType] || formData.serviceType}\n`;

    if (formData.serviceType === "marine") {
        text += `Boat Make: ${formData.boatMake || "—"}\n`;
        text += `Boat Model: ${formData.boatModel || "—"}\n`;
        text += `Boat Size: ${formData.boatSize || "—"}\n`;
        text += `Boat Location: ${formData.boatLocation || "—"}\n`;
        text += `Ready for Scanning: ${formData.boatReady || "—"}\n`;
    } else if (formData.serviceType === "camper") {
        text += `Vehicle Make: ${formData.vehicleMake || "—"}\n`;
        text += `Vehicle Model: ${formData.vehicleModel || "—"}\n`;
        text += `Vehicle Type: ${formData.vehicleType || "—"}\n`;
        text += `Vehicle Location: ${formData.vehicleLocation || "—"}\n`;
        text += `Ready for Scanning: ${formData.vehicleReady || "—"}\n`;
    } else if (formData.serviceType === "scanning") {
        text += `Scan Type: ${formData.scanType || "—"}\n`;
        text += `Scan Location: ${formData.scanLocation || "—"}\n`;
        text += `Scan Details: ${formData.scanDetails || "—"}\n`;
    }

    text += `\nCleaning Confirmed: ${formData.cleaning}\n`;
    text += `Dimensions: ${formData.dimensions}\n`;

    if (formData.message) {
        text += `\nMESSAGE:\n${formData.message}\n`;
    }

    if (logoUrls.length) {
        text += `\nLOGOS & LETTERING:\n`;
        logoUrls.forEach((url, i) => { text += `  ${i + 1}. ${url}\n`; });
    }

    if (photoUrls.length) {
        text += `\nUPLOADED PHOTOS (${photoUrls.length}):\n`;
        photoUrls.forEach((url, i) => { text += `  ${i + 1}. ${url}\n`; });
    }

    text += `\n${"—".repeat(45)}\n`;
    text += `Submitted via deckpromarine.com.au\n`;

    return text;
}

/* ─── HANDLER ─── */

const handler: Handler = async (event: HandlerEvent) => {
    // CORS headers
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json",
    };

    // Preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers, body: "" };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    try {
        const payload: FormPayload = JSON.parse(event.body || "{}");
        const { formData, photoUrls, logoUrls } = payload;

        // Basic server-side validation
        if (!formData?.name || !formData?.email || !formData?.phone) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: "Missing required fields" }),
            };
        }

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: "Deckpro Website <onboarding@resend.dev>", // Change to your verified domain: noreply@deckpromarine.com.au
            replyTo: formData.email,
            to: [CONTACT_EMAIL],
            subject: `New Enquiry: ${formData.name} — ${formData.serviceType === "marine" ? "Marine Flooring" : formData.serviceType === "camper" ? "Campers & 4x4" : "Precision Scanning"}`,
            html: buildEmailHTML(payload),
            text: buildPlainText(payload),
        });

        if (error) {
            console.error("Resend error:", error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: "Failed to send email" }),
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, id: data?.id }),
        };
    } catch (err) {
        console.error("Function error:", err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Internal server error" }),
        };
    }
};

export { handler };
