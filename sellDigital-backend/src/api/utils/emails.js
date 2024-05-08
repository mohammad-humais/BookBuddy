const { emailAdd, mailgunDomain, mailgunApi } = require("../../config/vars");
const { templates } = require("../../config/templates");
var nodemailer = require("nodemailer");
//send email to mentioned users
exports.sendEmail = async (
  email = "",
  type = "",
  content = null,
  subject = ""
) => {
  if (email !== "") {
    const getTemplate = await templates(type);
    if (getTemplate) {
      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "zainabbaskhakhi123@gmail.com",
          pass: "johscxogbqssppjl", // // Replace with your application-specific password
        },
      });
      const msg = {
        to: email,
        from: emailAdd,
        subject,
        html: getHtml(getTemplate, content),
      };
      await transporter.sendMail(msg);
    }
  }
};

function getHtml(text, content) {
  if (content) {
    for (let key in content) {
      text = text.replace(
        new RegExp("\\$\\{" + key + "\\}", "g"),
        content[key]
      );
    }
  }

  // Add CSS styles to the HTML template
  // Add CSS styles to the HTML template
  text = `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
          h1 {
            color: #333;
            font-size: 24px;
            /* Add your desired color for h1 */
            color: red;
          }
          h2 {
            color: #333;
            font-size: 18px;
            /* Add your desired color for h2 */
            color: blue;
          }
          p {
            color: #666;
            font-style: normal;
            /* Add your desired color for p.intro */
            color: green;
          }
        
          /* Add more CSS styles as needed */
        </style>
      </head>
      <body>
        ${text}
      </body>
    </html>
  `;

  return text;
}