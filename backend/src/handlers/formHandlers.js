const fs = require("fs");
const nodemailer = require("nodemailer");

const PDFDocument = require("pdfkit-table");
const {
  getWebService,
  getVdiService,
  getBmsService,
  getVmService,
  createOrganization,
  createInfrastructure,
  createService,
} = require("../controllers/helpers");

const formPostHandler = async (req, res) => {
  let organizationDetails = {
    org_name: req.body.name,
    street_building: req.body.streetBuildingAddress,
    city_country: req.body.cityAndCountry,
    postal_address: req.body.postalAddress,
    branches: req.body.branches,
    contact_name: req.body.contactName,
    contact_email: req.body.contactEmail,
    phonenumber: req.body.phoneNumber,
  };

  // insert organizational details
  const org_id = await createOrganization(organizationDetails);

  //insert infrastructure details

  if (req.body.infrastructureArray) {
    for (let i = 0; i < req.body.infrastructureArray.length; i++) {
      const infra_id = await createInfrastructure({
        org_id,
        ...req.body.infrastructureArray[i],
      });
    }
  }
  //insert organizational service
  if (req.body.webArray) {
    for (let i = 0; i < req.body.webArray.length; i++) {
      const infra_id = await createService({
        org_id,
        service_id: req.body.webArray[i].web_id,
        service_type: "Web-Hosting",
        number_required: req.body.webArray[i].number_required,
        csbs_required: req.body.webArray[i].csbs_required,
        challenges: req.body.challengeReason,
        additional_info: req.body.additionalInfo,
        signed_by: req.body.signedByName,
        signed_by_designation: req.body.signedDesignation,
        signature: req.body.signature,
      });
    }
  }

  if (req.body.vdiArray) {
    for (let i = 0; i < req.body.vdiArray.length; i++) {
      const vdi_id = await createService({
        org_id,
        service_id: req.body.vdiArray[i].vdi_id,
        service_type: "VDI",
        number_required: req.body.vdiArray[i].number_required,
        csbs_required: req.body.vdiArray[i].csbs_required,
        challenges: req.body.challengeReason,
        additional_info: req.body.additionalInfo,
        signed_by: req.body.signedByName,
        signed_by_designation: req.body.signedDesignation,
        signature: req.body.signature,
      });
    }
  }
  if (req.body.bmsArray) {
    for (let i = 0; i < req.body.bmsArray.length; i++) {
      const vm_id = await createService({
        org_id,
        service_id: req.body.bmsArray[i].bms_id,
        service_type: "BMS",
        number_required: req.body.bmsArray[i].number_required,
        csbs_required: req.body.bmsArray[i].csbs_required,
        challenges: req.body.challengeReason,
        additional_info: req.body.additionalInfo,
        signed_by: req.body.signedByName,
        signed_by_designation: req.body.signedDesignation,
        signature: req.body.signature,
      });
    }
  }

  if (req.body.vmArray) {
    for (let i = 0; i < req.body.vmArray.length; i++) {
      const bms_id = await createService({
        org_id,
        service_id: req.body.vmArray[i].vm_id,
        service_type: "VM",
        number_required: req.body.vmArray[i].number_required,
        csbs_required: req.body.vmArray[i].csbs_required,
        challenges: req.body.challengeReason,
        additional_info: req.body.additionalInfo,
        signed_by: req.body.signedByName,
        signed_by_designation: req.body.signedDesignation,
        signature: req.body.signature,
      });
    }
  }

  // handling sending email
  await handleSendingEmail(req, organizationDetails);
};

const sendEmail = async (datum) => {
  //creating the pdf document

  // init document
  let doc = new PDFDocument();
  // save document
  doc.pipe(fs.createWriteStream("./document.pdf"));

  (async function createTable() {
    // table

    doc.image("./konza logo.jpg", {
      fit: [40, 40],
      align: "center",
      valign: "center",
      addPage: true,
    });

    const orgTable = {
      title: "Organisation Details",
      addPage: true,
      headers: [
        { label: "org_name", property: "name", width: 60, renderer: null },
        {
          label: "street_building",
          property: "street",
          width: 60,
          renderer: null,
        },
        { label: "city_country", property: "city", width: 60, renderer: null },
        {
          label: "postal_address",
          property: "posta",
          width: 60,
          renderer: null,
        },
        { label: "branches", property: "branches", width: 60, renderer: null },
        {
          label: "contact-name",
          property: "contactName",
          width: 60,
          renderer: null,
        },
        {
          label: "contact-email",
          property: "contactEmail",
          width: 60,
          renderer: null,
        },
        {
          label: "phonenumber",
          property: "phone",
          width: 60,
          renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => {
            return `U$ ${Number(value).toFixed(2)}`;
          },
        },
      ],
      datas: [
        /* complex data */
        {
          name: datum.organizationDetails.org_name,
          street: datum.organizationDetails.street_building,
          city: datum.organizationDetails.city_country,
          posta: datum.organizationDetails.postal_address,
          branches: datum.organizationDetails.branches,
          contactName: datum.organizationDetails.contact_name,
          contactEmail: datum.organizationDetails.contact_email,
          phone: datum.organizationDetails.phonenumber,
        },
      ],
    };
    await doc.table(orgTable, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(8);
        indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
      },
    });

    // checking array is not empty collecting an array of objects containing the multiple infrastructure details
    if (datum.infrastructureArray) {
      const infraData = [];
      for (var i = 0; i < datum.infrastructureArray.length; i++) {
        let dt = {
          name: datum.infrastructureArray[i].application_name,
          os: datum.infrastructureArray[i].operating_system,
          cpu: datum.infrastructureArray[i].application_cpu,
          ram: datum.infrastructureArray[i].application_ram,
          storage: datum.infrastructureArray[i].application_storage,
          bandwidth: datum.infrastructureArray[i].application_bandwidth,
        };
        infraData.push(dt);
      }

      //creating the infrastructure table
      const infrastructureTable = {
        title: "Infrustructure Details",
        addPage: true,
        headers: [
          {
            label: "Application",
            property: "name",
            width: 100,
            renderer: null,
          },
          {
            label: "Operating System",
            property: "os",
            width: 100,
            renderer: null,
          },
          { label: "CPU", property: "cpu", width: 70, renderer: null },
          { label: "RAM", property: "ram", width: 70, renderer: null },
          { label: "Storage", property: "storage", width: 70, renderer: null },

          {
            label: "Bandwidth",
            property: "bandwidth",
            width: 70,
            renderer: null,
          },
        ],
        datas: infraData,
      };

      await doc.table(infrastructureTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
      });
    }
    //collecting an array of objects containing the multiple  BMS Service details

    if (datum.bmsServices) {
      const bmsData = [];
      for (var i = 0; i < datum.bmsServices.length; i++) {
        let dt = {
          type: datum.bmsServices[i].type,
          resources: datum.bmsServices[i].hardware_resources,
          number: datum.bmsServices[i].number_required,
          cost:
            datum.bmsServices[i].item_cost *
            datum.bmsServices[i].number_required,
        };
        bmsData.push(dt);
      }

      //creating the BMS SERVICES table
      const bmsTable = {
        title: "BMS Service Details",
        addPage: true,
        headers: [
          { label: "BMS Type", property: "type", width: 100, renderer: null },
          {
            label: "Hardware Resources",
            property: "resources",
            width: 100,
            renderer: null,
          },
          {
            label: "Number Required",
            property: "number",
            width: 100,
            renderer: null,
          },
          {
            label: "Total Cost",
            property: "cost",
            width: 100,
            renderer: (
              value,
              indexColumn,
              indexRow,
              row,
              rectRow,
              rectCell
            ) => {
              return `U$ ${Number(value).toFixed(2)}`;
            },
          },
        ],
        datas: bmsData,
      };

      await doc.table(bmsTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
      });
    }

    //collecting an array of objects containing the multiple  VDI Service details
    if (datum.vdiServices) {
      const vdiData = [];
      for (var i = 0; i < datum.vdiServices.length; i++) {
        let dt = {
          type: datum.vdiServices[i].type,
          resources: datum.vdiServices[i].hardware_resources,
          number: datum.vdiServices[i].number_required,
          cost:
            datum.vdiServices[i].item_cost *
            datum.vdiServices[i].number_required,
        };
        vdiData.push(dt);
      }

      //creating the vdi SERVICES table
      const vdiTable = {
        title: "VDI Service Details",
        addPage: true,
        headers: [
          { label: "VDI Type", property: "type", width: 100, renderer: null },
          {
            label: "Hardware Resources",
            property: "resources",
            width: 100,
            renderer: null,
          },
          {
            label: "Number Required",
            property: "number",
            width: 100,
            renderer: null,
          },
          {
            label: "Total Cost",
            property: "cost",
            width: 100,
            renderer: (
              value,
              indexColumn,
              indexRow,
              row,
              rectRow,
              rectCell
            ) => {
              return `U$ ${Number(value).toFixed(2)}`;
            },
          },
        ],
        datas: vdiData,
      };

      await doc.table(vdiTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
      });
    }

    //collecting an array of objects containing the multiple  VM Service details
    if (datum.vmServices) {
      const vmData = [];
      for (var i = 0; i < datum.vmServices.length; i++) {
        let dt = {
          type: datum.vmServices[i].type,
          resources: datum.vmServices[i].hardware_resources,
          number: datum.vmServices[i].number_required,
          csbs_number: datum.vmServices[i].csbs_required,
          cost:
            datum.vmServices[i].item_cost * datum.vmServices[i].number_required,
        };
        vmData.push(dt);
      }

      //creating the VM SERVICES table
      const vmTable = {
        title: "VM Service Details",
        addPage: true,
        headers: [
          { label: "BMS Type", property: "type", width: 100, renderer: null },
          {
            label: "Hardware Resources",
            property: "resources",
            width: 100,
            renderer: null,
          },
          {
            label: "Number Required",
            property: "number",
            width: 100,
            renderer: null,
          },
          {
            label: "CSBS Required",
            property: "csbs_number",
            width: 100,
            renderer: null,
          },
          {
            label: "Total Cost",
            property: "cost",
            width: 100,
            renderer: (
              value,
              indexColumn,
              indexRow,
              row,
              rectRow,
              rectCell
            ) => {
              return `U$ ${Number(value).toFixed(2)}`;
            },
          },
        ],
        datas: vmData,
      };
      await doc.table(vmTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
      });
    }

    //collecting an array of objects containing the multiple  Web Hosting Service details
    if (datum.webHostingServices) {
      const webHostingData = [];
      for (var i = 0; i < datum.webHostingServices.length; i++) {
        let dt = {
          type: datum.webHostingServices[i].type,
          resources: datum.webHostingServices[i].hardware_resources,
          cost: datum.webHostingServices[i].yearly_cost,
          traffic: datum.webHostingServices[i].traffic,
        };
        webHostingData.push(dt);
      }

      //creating the web hosting  SERVICES table
      const webHostingTable = {
        title: "Web Hosting Service Details",
        addPage: true,
        headers: [
          { label: "Type", property: "type", width: 100, renderer: null },
          {
            label: "Hardware Resources",
            property: "resources",
            width: 100,
            renderer: null,
          },
          {
            label: "Cost",
            property: "cost",
            width: 100,
            renderer: (
              value,
              indexColumn,
              indexRow,
              row,
              rectRow,
              rectCell
            ) => {
              return `U$ ${Number(value).toFixed(2)}`;
            },
          },
          {
            label: "Traffic",
            property: "traffic",
            width: 100,
            renderer: null,
          },
        ],
        datas: webHostingData,
      };

      await doc.table(webHostingTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
      });
    }

    doc.moveDown();
    doc.font("Helvetica-Bold").fontSize(12).text(`Challenges`, {
      width: 410,
      align: "justify",
    });
    doc.font("Helvetica").fontSize(10).text(`${datum.challenges}`, {
      width: 410,
      align: "justify",
    });
    doc.moveDown();

    doc.moveDown();
    doc.font("Helvetica-Bold").fontSize(12).text(`Additional info`, {
      width: 410,
      align: "justify",
    });
    doc.font("Helvetica").fontSize(10).text(`${datum.additional_info}`, {
      width: 410,
      align: "justify",
    });
    doc.moveDown();

    doc.moveDown();
    doc.font("Helvetica-Bold").fontSize(12).text(`Signature Details`, {
      width: 410,
      align: "justify",
    });

    doc.font("Helvetica").fontSize(10).text(`Signed By:   ${datum.signed_by}`, {
      width: 500,
      align: "justify",
    });

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(`Designation:     ${datum.signed_by_designation}`, {
        width: 500,
        align: "justify",
      });
      doc.moveDown()
    doc.font("Helvetica-Bold").fontSize(12).text(`Signature`, {
      width: 500,
      align: "justify",
    });

    //converting the base 64 signature encoding back to and image
    // Convert base64 to buffer
    const base64 = datum.signature.slice(22);
    const buffer = Buffer.from(base64, "base64");

    // Pipes an image with "new-path.jpg" as the name.
    fs.writeFileSync("./signature.png", buffer);

    //adding the converted image signature to the pdf
    doc.image("./signature.png", {
      fit: [250, 180],
      align: "center",
      valign: "center",
    });

    doc.moveDown();

    doc.end();
  })();

  //creating an email transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //2.Define the email options
  const mailOptions = {
    from: datum.organizationDetails.contact_email,
    to: "ianndathi35@gmail.com",
    subject: `Filled KNDC requirements from ${datum.organizationDetails.org_name}`,
    text: "Please find the filled requirements form attached",
    attachments: [
      {
        filename: "requirements form data.pdf",
        path: "./document.pdf",
      },
    ],
  };
  //3.Actually send the email
  await transporter.sendMail(mailOptions).then(console.log("sending done!!"));
};

const handleSendingEmail = async (req, organizationDetails) => {
  let vdiServices = [];
  let bmsServices = [];
  let vmServices = [];
  let webHostingServices = [];
  let pdfObject = {
    organizationDetails,
    infrastructureArray: req.body.infrastructureArray,
  };

  if (req.body.bmsArray) {
    for (let i = 0; i < req.body.bmsArray.length; i++) {
      let service = await getBmsService(req.body.bmsArray[i].bms_id);
      bmsServices.push({
        number_required: req.body.bmsArray[i].number_required,
        ...service,
      });
    }
    pdfObject = { ...pdfObject, bmsServices };
  }

  if (req.body.vdiArray) {
    for (let i = 0; i < req.body.vdiArray.length; i++) {
      let service = await getVdiService(req.body.vdiArray[i].vdi_id);
      vdiServices.push({
        number_required: req.body.vdiArray[i].number_required,
        ...service,
      });
    }
    pdfObject = { ...pdfObject, vdiServices };
  }

  if (req.body.vmArray) {
    for (let i = 0; i < req.body.vmArray.length; i++) {
      let service = await getVmService(req.body.vmArray[i].vm_id);
      vmServices.push({
        number_required: req.body.vmArray[i].number_required,
        csbs_required: req.body.vmArray[i].csbs_required,
        ...service,
      });
    }

    pdfObject = { ...pdfObject, vmServices };
  }

  if (req.body.webArray) {
    for (let i = 0; i < req.body.webArray.length; i++) {
      let service = await getWebService(req.body.webArray[i].web_id);
      webHostingServices.push({
        ...service,
      });
    }

    pdfObject = { ...pdfObject, webHostingServices };
  }

  if (req.body.challengeReason) {
    pdfObject = { ...pdfObject, challenges: req.body.challengeReason };
  }

  if (req.body.additionalInfo) {
    pdfObject = { ...pdfObject, additional_info: req.body.additionalInfo };
  }

  pdfObject = { ...pdfObject, signed_by: req.body.signedByName };
  pdfObject = {
    ...pdfObject,
    signed_by_designation: req.body.signedDesignation,
  };
  pdfObject = { ...pdfObject, signature: req.body.signature };

  console.log("PDFObject", pdfObject);

  await sendEmail(pdfObject);
};

module.exports = { formPostHandler };
