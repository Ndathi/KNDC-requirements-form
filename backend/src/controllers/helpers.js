const dbConfig = require("../config/db.config");
const {
  GET_ORG_ID,
  GET_ALL_SERVICES,
  INSERT_SERVICE,
  GET_ALL_INFRASTRUCTURE,
  INSERT_INFRASTRUCTURE,
  INSERT_ORG,
  GET_WEB_SERVICE,
  GET_VDI_SERVICE,
  GET_BMS_SERVICE,
  GET_VM_SERVICE,
} = require("../db/queries/queries");

//Get connection Promise
const promisePool = dbConfig();

const getOrganizationId = async (org_id) => {
  try {
    let [rows, _] = await promisePool.query(GET_ORG_ID + org_id); //returns  the resultSet and the fields set
    if (!rows[0]) {
      console.log({
        message: "Not found",
        ok: false,
      });
      return;
    }
    console.log("OrganizationId:", rows[0]);
  } catch (error) {
    console.log("Error", error);
  }
};

const getWebService = async (web_id) => {
  try {
    let [rows, _] = await promisePool.query(GET_WEB_SERVICE + web_id); //returns  the resultSet and the fields set
    if (!rows[0]) {
      console.log({
        message: "Not found",
        ok: false,
      });
      return;
    }
    return rows[0];
  } catch (error) {
    console.log("Error", error);
  }
};

const getBmsService = async (bms_id) => {
  try {
    let [rows, _] = await promisePool.query(GET_BMS_SERVICE + bms_id); //returns  the resultSet and the fields set
    if (!rows[0]) {
      console.log({
        message: "Not found",
        ok: false,
      });
      return;
    }
    return rows[0];
  } catch (error) {
    console.log("Error", error);
  }
};

const getVdiService = async (vdi_id) => {
  try {
    let [rows, _] = await promisePool.query(GET_VDI_SERVICE + vdi_id); //returns  the resultSet and the fields set
    if (!rows[0]) {
      console.log({
        message: "Not found",
        ok: false,
      });
      return;
    }
    return rows[0];
  } catch (error) {
    console.log("Error", error);
  }
};

const getVmService = async (vm_id) => {
  try {
    let [rows, _] = await promisePool.query(GET_VM_SERVICE + vm_id); //returns  the resultSet and the fields set
    if (!rows[0]) {
      console.log({
        message: "Not found",
        ok: false,
      });
      return;
    }
    return rows[0];
  } catch (error) {
    console.log("Error", error);
  }
};

const getAllServices = async (joinQuery) => {
  try {
    let [rows, _] = await promisePool.query(GET_ALL_SERVICES + joinQuery); //returns  the resultSet and the fields set
    if (!rows[0]) {
      console.log({
        message: "Not found",
        ok: false,
      });
      return;
    }
    console.log("VDI:", rows);
  } catch (error) {
    console.log("Error", error);
  }
};

const getAllInfrastructures = async () => {
  try {
    let [rows, _] = await promisePool.query(GET_ALL_INFRASTRUCTURE);

    console.log("Infrastructures", rows);
  } catch (error) {
    console.log("Error", error);
  }
};

const createService = async (values) => {
  try {
    const result = await promisePool.query(
      INSERT_SERVICE,
      Object.values(values)
    );

    console.log("insert service result", result);
  } catch (error) {
    console.log(error);
  }
};

const createInfrastructure = async (values) => {
  try {
    const result = await promisePool.query(
      INSERT_INFRASTRUCTURE,
      Object.values(values)
    );

    return result[0].insertId;
  } catch (error) {
    console.log(error);
  }
};

const createOrganization = async (values) => {
  try {
    const result = await promisePool.query(INSERT_ORG, Object.values(values));

    return result[0].insertId;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOrganizationId,
  getWebService,
  getBmsService,
  getVdiService,
  getVmService,
  getAllServices,
  createInfrastructure,
  getAllInfrastructures,
  createOrganization,
  createService,
};
