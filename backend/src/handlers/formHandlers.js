const {
  getWebService,
  getVdiService,
  getBmsService,
  getVmService,
  createOrganization,
  createInfrastructure,
  createService,
  getAllServices,
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
  for (let i = 0; i < req.body.infrastructureArray.length; i++) {
    const infra_id = await createInfrastructure({
      org_id,
      ...req.body.infrastructureArray[i],
    });
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

const handleSendingEmail = async (req, organizationDetails) => {
  let vdiServices = [];
  let bmsServices = [];
  let vmServices = [];
  let webHostingServices = [];
  let pdfObject = { organizationDetails, infrastructureArray: req.body.infrastructureArray };

  if (req.body.bmsArray) {
    for (let i = 0; i < req.body.bmsArray.length; i++) {
      let service = await getBmsService(req.body.bmsArray[i].bms_id)
      bmsServices.push({
        number_required: req.body.bmsArray[i].number_required,
        ...service
      });
    }
    pdfObject = { ...pdfObject, bmsServices };
  }

  if (req.body.vdiArray) {
    for (let i = 0; i < req.body.vdiArray.length; i++) {
      let service = await getVdiService(req.body.vdiArray[i].vdi_id)
      vdiServices.push({
        number_required: req.body.vdiArray[i].number_required,
        ...service
      });
    }
    pdfObject = { ...pdfObject, vdiServices };
  }

  if (req.body.vmArray) {
    for (let i = 0; i < req.body.vmArray.length; i++) {
      let service = await getVmService(req.body.vmArray[i].vm_id)
      vmServices.push({
        number_required: req.body.vmArray[i].number_required,
        csbs_required: req.body.vmArray[i].csbs_required,
        ...service
      });
    }

    pdfObject = { ...pdfObject, vmServices };
  }

  if (req.body.webArray) {
    for (let i = 0; i < req.body.webArray.length; i++) {
      let service = await getWebService(req.body.webArray[i].web_id) 
      webHostingServices.push({
        ...service
      });
    }
    
    pdfObject = { ...pdfObject, webHostingServices };
  }

  console.log("PDFObject", pdfObject);
};

module.exports = { formPostHandler };
