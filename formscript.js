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
    console.log(currid);
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
