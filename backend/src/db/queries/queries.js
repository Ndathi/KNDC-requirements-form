// organization_queries
INSERT_ORG = `INSERT INTO organization_details(org_name, street_building, city_country, postal_address, branches, contact_name, contact_email, phonenumber) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

GET_ORG_ID = `SELECT org_id FROM organization_details WHERE org_id =`;


INSERT_SERVICE = `INSERT INTO organizational_services(org_id, service_id, service_type, number_required, csbs_required, challenges, additional_info, signed_by, signed_by_designation, signature) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//infrastructure  queries
INSERT_INFRASTRUCTURE = `INSERT INTO infrastructure_details(org_id, application_name, operating_system, application_cpu, application_ram, application_storage, application_bandwidth) VALUES(?, ?, ?, ?, ?, ?, ?)`;

GET_ALL_INFRASTRUCTURE = `SELECT * FROM infrastructure_details id JOIN organization_details od ON id.org_id = od.org_id`;


// web_service queries
GET_WEB_SERVICE = `SELECT type, hardware_resources, yearly_cost FROM web_hosting_service WHERE web_id =`;

// bms_service queries
GET_BMS_SERVICE = `SELECT type, hardware_resources, item_cost FROM bms_service WHERE bms_id =`;

// vdi_service queries
GET_VDI_SERVICE = `SELECT type, hardware_resources, item_cost FROM vdi_service WHERE vdi_id =`;

// vm_service queries
GET_VM_SERVICE = `SELECT type, hardware_resources, item_cost FROM vm_service WHERE vm_id =`;

// organizational servises queries
// GET organizational services:: JOIN bms_service bs ON os.service_id = bs.bms_id, JOIN vdi_service vds ON os.service_id = vds.vdi_id, JOIN web_service web ON os.service_id = web.web_id, JOIN vm_service vm ON os.service_id = vm.vm_id
GET_ALL_SERVICES = `SELECT * FROM organizational_services os JOIN organization_details od ON os.org_id = od.org_id JOIN infrastructure_details id ON os.org_id = id.org_id`;

module.exports = {
  INSERT_SERVICE,
  INSERT_INFRASTRUCTURE,
  INSERT_ORG,
  GET_ORG_ID,
  GET_ALL_SERVICES,
  GET_ALL_INFRASTRUCTURE,
  GET_WEB_SERVICE,
  GET_BMS_SERVICE,
  GET_VDI_SERVICE,
  GET_VM_SERVICE
};
