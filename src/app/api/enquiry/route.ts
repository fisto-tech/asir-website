import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtmlTemplate({
  name,
  company,
  email,
  phone,
  enquiryType,
  product,
  message,
  dateString,
}: {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: string;
  product: string;
  message: string;
  dateString: string;
}) {
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeEnquiryType = escapeHtml(enquiryType);
  const safeProduct = escapeHtml(product || "None specified");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 36px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #e4e4e7;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #111111; padding: 28px 36px; border-bottom: 3px solid #0066cc;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #0066cc; color: #ffffff; font-weight: 800; font-size: 16px; padding: 6px 10px; border-radius: 4px; margin-right: 10px; vertical-align: middle;">A</span>
                    <span style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.12em; vertical-align: middle; text-transform: uppercase;">ASIR CONTAINERS</span>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(0, 102, 204, 0.15); color: #60a5fa; border: 1px solid rgba(0, 102, 204, 0.3); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.08em;">New Lead</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Area -->
          <tr>
            <td style="padding: 32px 36px 12px 36px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #111111; line-height: 1.3;">New Container Enquiry</h1>
              <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #71717a;">Received via asircontainers.com on ${dateString}</p>
            </td>
          </tr>

          <!-- Key Details Grid -->
          <tr>
            <td style="padding: 16px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; width: 35%; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Full Name</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; font-weight: 600; color: #111111;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Company</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; font-weight: 600; color: #111111;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Email Address</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; color: #0066cc;"><a href="mailto:${safeEmail}" style="color: #0066cc; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Phone Number</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; color: #111111; font-weight: 500;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Enquiry Type</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; font-weight: 600; color: #111111;">${safeEnquiryType}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Product Ref</td>
                  <td style="padding: 14px 18px; font-size: 15px; font-weight: 600; color: #16a34a;">${safeProduct}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Card -->
          <tr>
            <td style="padding: 12px 36px 28px 36px;">
              <div style="background-color: #ffffff; border: 1px solid #e4e4e7; border-left: 4px solid #0066cc; border-radius: 8px; padding: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em;">Enquiry Message & Requirements</p>
                <div style="font-size: 15px; line-height: 1.6; color: #27272a;">${safeMessage}</div>
              </div>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 36px 36px 36px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius: 8px; background-color: #0066cc;">
                    <a href="mailto:${safeEmail}?subject=Re:%20ASIR%20Containers%20Enquiry%20(${encodeURIComponent(safeProduct)})" target="_blank" style="padding: 12px 24px; border: 1px solid #0066cc; border-radius: 8px; font-family: sans-serif; font-size: 14px; color: #ffffff; text-decoration: none; font-weight: 600; display: inline-block;">
                      Reply Directly &rarr;
                    </a>
                  </td>
                  <td style="width: 12px;"></td>
                  <td style="border-radius: 8px; background-color: #ffffff; border: 1px solid #d4d4d8;">
                    <a href="tel:${safePhone}" style="padding: 12px 20px; font-family: sans-serif; font-size: 14px; color: #18181b; text-decoration: none; font-weight: 600; display: inline-block;">
                      Call Customer
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; border-top: 1px solid #e4e4e7; padding: 20px 36px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.5;">
                ASIR Containers &bull; 1 734-c1, Pallapatti Rd, near Central Excise Office, Thiruthangal, Sivakasi, Tamil Nadu 626130<br>
                This automated lead notification was generated from the website contact system.
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

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const name = data.name?.trim() || "";
    const company = data.company?.trim() || "";
    const email = data.email?.trim() || "";
    const phone = data.phone?.trim() || "";
    const enquiryType = data.enquiryType || "General Enquiry";
    const product = data.product || "";
    const message = data.message?.trim() || "";

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, phone number, and message are required." },
        { status: 422 }
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json(
        { success: false, message: "Phone number must be between 7 and 15 digits." },
        { status: 422 }
      );
    }

    // SMTP configuration
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER || "fistotech01@gmail.com";
    const smtpPass = process.env.SMTP_PASS || "";
    const smtpFrom = process.env.SMTP_FROM || "fistotech01@gmail.com";
    const toEmail = process.env.NOTIFICATION_EMAIL || "fistotech01@gmail.com";

    const dateString = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const subject = `[New Website Enquiry] ${product ? product + " - " : ""}${enquiryType} from ${company || name}`;
    const htmlBody = buildHtmlTemplate({
      name,
      company,
      email,
      phone,
      enquiryType,
      product,
      message,
      dateString,
    });

    let mailSent = false;

    // Send via Nodemailer (Google SMTP)
    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"ASIR Containers Website" <${smtpFrom}>`,
          to: toEmail,
          replyTo: email,
          subject,
          text: `New Enquiry from ${name} (${company || "N/A"})\nEmail: ${email}\nPhone: ${phone}\nEnquiry Type: ${enquiryType}\nProduct: ${product || "None"}\n\nMessage:\n${message}`,
          html: htmlBody,
        });

        mailSent = true;
        console.log(`[Enquiry API] Email sent successfully from ${smtpFrom} to ${toEmail}`);
      } catch (mailErr: unknown) {
        console.error("[Enquiry API] Failed to send email via SMTP:", mailErr);
      }
    } else {
      console.warn(
        `[Enquiry API] SMTP_PASS not set in environment. Set SMTP_PASS in .env.local (Google App Password for ${smtpUser}) to send live emails.`
      );
    }

    // Secondary fallback: Try forwarding to local/server PHP handler if available
    if (!mailSent) {
      const phpEndpoint = process.env.PHP_API_URL || "http://localhost/send-enquiry.php";
      try {
        const phpRes = await fetch(phpEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (phpRes.ok) {
          const phpJson = await phpRes.json();
          return NextResponse.json(phpJson);
        }
      } catch {
        // PHP server not running, continue gracefully
      }
    }

    // Success response for the client
    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been received.",
    });
  } catch (err: unknown) {
    console.error("[Enquiry API] Error processing request:", err);
    return NextResponse.json(
      { success: false, message: "Failed to process enquiry." },
      { status: 500 }
    );
  }
}
