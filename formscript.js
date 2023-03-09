// getting form data
const detailsForm = document.getElementById("form");

let organizationDetails = {
  name: "",
  streetBuildingAddress: "",
  cityAndCountry: "",
  postalAddress: "",
  branches: "",
  contactName: "",
  contactEmail: "",
  phoneNumber: "",
};

detailsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  organizationDetails = organizationDetailsValidator();

  document.getElementById("orgBtn").innerText = "Saved";
});

//getting infrastructure details
const infrastructureTable = document.getElementById("infrastructure-table");
const infrastructureSaveBtn = document.getElementById(
  "saveInfrastructureDetails"
);

let infrastructureItem = {
  applicationName: "",
  applicationOS: "",
  applicationCPU: "",
  applicationRAM: "",
  applicationStorage: "",
  applicationBandwidth: "",
};

// infractructure details vaiables
let applicationName = document.getElementById("app-name-1").value;
let applicationOS = document.getElementById("app-os-1").value;
let applicationCPU = document.getElementById("app-cpu-1").value;
let applicationRAM = document.getElementById("app-ram-1").value;
let applicationStorage = document.getElementById("app-storage-1").value;
let applicationBandwidth = document.getElementById("app-bandwidth-1").value;

let infrastructureDetailsArray = [];

// infrastructure btn onclick
let infrastructureArray = [];
infrastructureSaveBtn.addEventListener("click", (e) => {
  //loop thru the rows and append an array with the row data
  infrastructureArray = infrastructureDetailsValidator();

  //update the button innerText
  if (infrastructureArray.length != 0)
    infrastructureSaveBtn.innerText = "Saved";
});

// Adding another application
$(document).ready(function () {
  let id = 2;
  $("#addItemBtn").click(function () {
    $("#table-rows tr:last").after(
      ` <tr><td><input type="text" class= "form-control" name="app-name-${id}" id="app-name-${id}" placeholder="e.g ERP" style="border: 0;border-bottom: 1px solid grey;outline: none;"/></td><td><input class= "form-control" type="text" name="app-os-${id}" id="app-os-${id}" placeholder="e.g Linux, Windows" style="border: 0;border-bottom: 1px solid grey;outline: none;"/></td><td> <input class= "form-control" type="number" name="app-cpu-${id}" id="app-cpu-${id}" placeholder="e.g 2.4" style="border: 0;border-bottom: 1px solid grey;outline: none;"/></td><td><input class= "form-control" type="number" name="app-ram-${id}" id="app-ram-${id}" placeholder="e.g 32" style="border: 0;border-bottom: 1px solid grey;outline: none;"/></td><td><input class= "form-control" type="number" name="app-storage-${id}" id="app-storage-${id}" placeholder="e.g 200" style="border: 0;border-bottom: 1px solid grey;outline: none;"/></td><td><input class= "form-control" type="number" name="app-bandwidth-${id}" id="app-bandwidth-${id}" placeholder="e.g 300" style="border: 0;border-bottom: 1px solid grey;outline: none;"/></td></tr>`
    );
    id += 1;
  });
});

// check boxes declaration
const vmCheckBox = document.getElementById("vm-check");
const bmsCheckBox = document.getElementById("bms-check");
const vdiCheckBox = document.getElementById("vdi-check");
const webCheckBox = document.getElementById("web-check");

// services declarations
const vmService = document.getElementById("vm-service");
const bmsService = document.getElementById("bms-service");
const vdiService = document.getElementById("vdi-service");
const webService = document.getElementById("web-service");
const webContainer = document.getElementById("web-container");

// eventlisteners for checkboxes
vmCheckBox.addEventListener("change", (e) => {
  if (e.target.checked) {
    vmService.style.height = "auto"; // 110vh
    return;
  }
  vmService.style.height = "45px";
});

bmsCheckBox.addEventListener("change", (e) => {
  if (e.target.checked) {
    bmsService.style.height = "auto"; // 44vh
    return;
  }
  bmsService.style.height = "45px";
});

vdiCheckBox.addEventListener("change", (e) => {
  if (e.target.checked) {
    vdiService.style.height = "auto"; // 49vh
    return;
  }
  vdiService.style.height = "45px";
});

webCheckBox.addEventListener("change", (e) => {
  if (e.target.checked) {
    webService.style.height = "auto"; // 140vh
    return;
  }
  webService.style.height = "45px";
});

// vm service details
const vmSaveBtn = document.getElementById("vm-save");
let vmArray = [];

//event listener
vmSaveBtn.addEventListener("click", (e) => {
  vmArray = vmDetailsValidator();
  //update the button innerText
  if (vmArray.length > 0) vmSaveBtn.innerText = "Saved";
});

// Handling adding of CSBS quantity per VM Resource
$(document).ready(function () {
  let states = [
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
  ];

  $("#rats").change(function (event) {
    var currid = event.target.id;
    const result = currid.split("-")[2];
    var b = parseInt(result);

    var tarId = "#" + currid;
    if (states[b - 1] === "false") {
      $(tarId).after(
        `<tr id="csbs-quantity">
            <td colspan="4" align="center" id="td-col">
                <p>CSBS(Indicate the quantity required which is least half of the VM storage capacity </p>
             <input type="number" name="csbs" id="csbs-${b}" style=" border: 0; border-bottom: 1px solid grey; outline: none;" />
            </td>
         </tr>`
      );

      states[b - 1] = "true";
    }
  });
});

//bms service capture
const bmsSaveBtn = document.getElementById("bms-save");
let bmsArray = [];

//onclick event listener
bmsSaveBtn.addEventListener("click", (e) => {
  bmsArray = bmsDetailsValidator();

  //update the button innerText
  if (bmsArray.length > 0) bmsSaveBtn.innerText = "Saved";
});

// web service details
const webSaveBtn = document.getElementById("web-save");
let webArray = [];

// loading web select buttons initially
const selectBtns = document.querySelectorAll("#select-btn");
const selectRows = document.querySelectorAll("#select-row");

let selectedButtons = [];

for (let i = 0; i < selectBtns.length; i++) {
  let selected = false;
  selectBtns[i].addEventListener("click", (e) => {
    const name = e.target.attributes["name"].value;

    selected = !selected;
    if (selected) {
      selectBtns[i].innerText = "Unselect";
      selectBtns[i].style.outline = "none !important";
      selectRows[i].style.backgroundColor = "#006600";
      selectRows[i].style.color = "white";

      //add the button to the selected buttons
      selectedButtons.push({ name });
    } else {
      selectBtns[i].innerText = "Select";
      selectBtns[i].style.outline = "none !important";
      selectBtns[i].style.backgroundColor = "#006600";
      selectRows[i].style.backgroundColor = "transparent";
      selectRows[i].style.color = "black";

      //remove the button from the array
      selectedButtons = selectedButtons.filter((n) => n.name !== name);
    }
  });
}

//onclick event listener
webSaveBtn.addEventListener("click", (e) => {
  webArray = webDetailsValidator();

  //update the button innerText
  if (webArray.length > 0) webSaveBtn.innerText = "Saved";
});

// vdi service details
const vdiSaveBtn = document.getElementById("vdi-save");
let vdiArray = [];

//onclick event listener
vdiSaveBtn.addEventListener("click", (e) => {
  vdiArray = vdiDetailsValidator();

  //update the button innerText
  if (vdiArray.length > 0) vdiSaveBtn.innerText = "Saved";
});

var canvas = document.getElementById("signature-pad");

function resizeCanvas() {
  var ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
  backgroundColor: "rgb(250,250,250)",
});

document.getElementById("clearSignPad").addEventListener("click", function () {
  signaturePad.clear();
});

//challenge-reason and info textareas
const challengeReason = document.getElementById("challenge-reason-textarea");
const infoTextArea = document.getElementById("info-textarea");
const signName = document.getElementById("sign-name");
const signDesignation = document.getElementById("sign-designation");

//submit form button
const submitFormBtn = document.getElementById("submitBtn");
submitFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // signature
  const si = signaturePad.toDataURL();

  if (!signName.value) {
    //request their focus
    signName.focus();
    return;
  }
  if(!signDesignation.value){
    //request their focus
    signDesignation.focus();
    return
  }
  if (signaturePad.isEmpty()) {
    alert("Kindly make sure you sign");
    return;
  }

  // formValidator:: Incase user didn't click the save buttons
  const formValidatorData = formValidator();

  const mailObject = {
    ...buildObject(
      formValidatorData.organizationDetails,
      infrastructureArray.length > 0
        ? infrastructureArray
        : formValidatorData.infrastructure,
      vmCheckBox.checked ? vmArray.length > 0 ? vmArray : formValidatorData.vm : [], // this ensures that the array is read only when the service checkbox is checked
      vdiCheckBox.checked ? vdiArray.length > 0 ? vdiArray : formValidatorData.vdi: [], // this ensures that the array is read only when the service checkbox is checked
      webCheckBox.checked ? webArray.length > 0 ? webArray : formValidatorData.web : [], // this ensures that the array is read only when the service checkbox is checked
      bmsCheckBox.checked ? bmsArray.length > 0 ? bmsArray : formValidatorData.bms : [] // this ensures that the array is read only when the service checkbox is checked
    ),
    challengeReason: challengeReason.value,
    additionalInfo: infoTextArea.value,
    signedByName: signName.value,
    signedDesignation: signDesignation.value,
    submissionDate: new Date().toLocaleDateString(),
    signature: si,
  };

  // send mail
   sendMail(mailObject)
});

const organizationDetailsValidator = () => {
  const name = detailsForm.elements["org-name"].value;
  const streetBuildingAddress = detailsForm.elements["street-building"].value;
  const cityAndCountry = detailsForm.elements["city-country"].value;
  const postalAddress = detailsForm.elements["postal"].value;
  const branches = detailsForm.elements["no-branches"].value;
  const contactName = detailsForm.elements["contact-person"].value;
  const contactEmail = detailsForm.elements["contact-email"].value;
  const phoneNumber = detailsForm.elements["phone-no"].value;

  $("#org-infra").removeClass("disabled");
  $("#serv-inte").removeClass("disabled");

  organizationDetails = {
    name,
    streetBuildingAddress,
    cityAndCountry,
    postalAddress,
    branches,
    contactName,
    contactEmail,
    phoneNumber,
  };

  return organizationDetails;
};

const infrastructureDetailsValidator = () => {
  let tableRowsCount = infrastructureTable.rows.length;

  // loop thru the rows and append an array with the row data
  return fillInfrastructureDataArray(tableRowsCount);
};

const fillInfrastructureDataArray = (tableRowsLength) => {
  let rowsArray = [];
  for (let i = 1; i < tableRowsLength; i++) {
    let application_name = document.getElementById(`app-name-${i}`).value;
    let operating_system = document.getElementById(`app-os-${i}`).value;
    let application_cpu = document.getElementById(`app-cpu-${i}`).value;
    let application_ram = document.getElementById(`app-ram-${i}`).value;
    let application_storage = document.getElementById(`app-storage-${i}`).value;
    let application_bandwidth = document.getElementById(
      `app-bandwidth-${i}`
    ).value;

    if (!application_name) {
      continue;
    }
    if (
      application_name &&
      (!operating_system ||
        !application_cpu ||
        !application_ram ||
        !application_storage)
    ) {
      alert(
        "Application name. operating system, cpu, ram, storage are required"
      );
      return;
    }

    // append measurements, i.e Ghz for cpu, GB for storage, bandwidth and ram
    application_cpu += "Ghz"
    application_ram += "GB"
    application_storage += "GB"
    application_bandwidth += "GB"

    // push into the array
    rowsArray.push({
      application_name,
      operating_system,
      application_cpu,
      application_ram,
      application_storage,
      application_bandwidth,
    });
  }
  return rowsArray;
};

const vmDetailsValidator = () => {
  let detailsArray = [];
  //number inputts
  let no = [];
  for (let i = 0; i < 11; i++) {
    no[i] = document.getElementById(`no-required-${i + 1}`).value;
  }

  // csbs inputts
  let cs = [];
  for (let i = 0; i < 11; i++) {
    if (no[i]) cs[i] = document.getElementById(`csbs-${i + 1}`).value;
  }

  for (let i = 0; i < 11; i++) {
    if (no[i] && cs[i].length) {
      detailsArray.push({
        vm_id: i + 1,
        number_required: no[i],
        csbs_required: cs[i],
      });
    } else {
      continue;
    }
  }
  return detailsArray;
};

const bmsDetailsValidator = () => {
  let detailsArray = [];
  let smallType = document.getElementById(`no-required-small`).value;
  let largeType = document.getElementById(`no-required-large`).value;

  if (smallType) {
    detailsArray.push({ bms_id: 1, number_required: smallType });
  }
  if (largeType) {
    detailsArray.push({ bms_id: 2, number_required: largeType });
  }

  return detailsArray;
};

const vdiDetailsValidator = () => {
  let detailsArray = [];
  let greaterThanOrEqualTo12Type =
    document.getElementById(`vdi-no-required-1`).value;
  let sixToLessThan12 = document.getElementById(`vdi-no-required-2`).value;
  let lessThan6 = document.getElementById(`vdi-no-required-3`).value;

  if (greaterThanOrEqualTo12Type) {
    detailsArray.push({
      vdi_id: 1,
      number_required: greaterThanOrEqualTo12Type,
    });
  }

  if (sixToLessThan12) {
    detailsArray.push({ vdi_id: 2, number_required: sixToLessThan12 });
  }

  if (lessThan6) {
    detailsArray.push({ vdi_id: 3, number_required: lessThan6 });
  }

  return detailsArray;
};

const webDetailsValidator = () => {
  let detailsArray = [];
  for (let i = 0; i < selectedButtons.length; i++) {
    if (selectedButtons[i].name == "low-1") {
      detailsArray.push({ web_id: 1 });
    } else if (selectedButtons[i].name == "low-2") {
      detailsArray.push({ web_id: 2 });
    } else if (selectedButtons[i].name == "low-3") {
      detailsArray.push({ web_id: 3 });
    } else if (selectedButtons[i].name == "low-4") {
      detailsArray.push({ web_id: 4 });
    }

    // high traffic
    else if (selectedButtons[i].name == "high-1") {
      detailsArray.push({ web_id: 5 });
    } else if (selectedButtons[i].name == "high-2") {
      detailsArray.push({ web_id: 6 });
    } else if (selectedButtons[i].name == "high-3") {
      detailsArray.push({ web_id: 7 });
    } else if (selectedButtons[i].name == "high-4") {
      detailsArray.push({ web_id: 8 });
    } else {
      console.log(selectedButtons[i]);
    }
  }
  return detailsArray;
};

const formValidator = () => {
  // ensure organization details
  const organizationDetails = organizationDetailsValidator();

  //infrastructure details
  const infrastructure = infrastructureDetailsValidator();

  //vm details
  const vm = vmDetailsValidator();

  //bms details
  const bms = bmsDetailsValidator();

  // web details
  const web = webDetailsValidator();

  //vdi details
  const vdi = vdiDetailsValidator();

  return { organizationDetails, infrastructure, vm, bms, web, vdi };
};

const sendMail = (mailObject) => {
  fetch("http://localhost:5000/form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mailObject),
  })
    .then((d) => d.json())
    .then((data) => console.log("Data", data))
    .catch((err) => console.log("error", err));
};

const buildObject = (
  details,
  infrastructureArray,
  vmArray,
  vdiArray,
  webArray,
  bmsArray
) => {
  let detailsObject = {
    name: details["name"],
    streetBuildingAddress: details["streetBuildingAddress"],
    cityAndCountry: details["cityAndCountry"],
    postalAddress: details["postalAddress"],
    branches: details["branches"],
    contactName: details["contactName"],
    contactEmail: details["contactEmail"],
    phoneNumber: details["phoneNumber"],
  };

  if (infrastructureArray.length > 0)
    detailsObject = { ...detailsObject, infrastructureArray };
  if (vdiArray.length > 0) detailsObject = { ...detailsObject, vdiArray };
  if (vmArray.length > 0) detailsObject = { ...detailsObject, vmArray };
  if (webArray.length > 0) detailsObject = { ...detailsObject, webArray };
  if (bmsArray.length > 0) detailsObject = { ...detailsObject, bmsArray };
  if (vdiArray.length > 0) detailsObject = { ...detailsObject, vdiArray };

  return detailsObject;
};