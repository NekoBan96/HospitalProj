const Router = require("express");
const router = new Router();
const HospitalController = require("../controller/hospitals.controller");
const DeviceController = require("../controller/device.controller");

// HOSPITALS
router.post("/addhospital", HospitalController.addHospital);
router.get("/gethospitals", HospitalController.getHospitals);
router.get("/getallhospitals", HospitalController.getAllHospitals);
router.delete("/deletehospital", HospitalController.deleteHospital);


// DEVICES
router.post("/adddevice", DeviceController.addDevice);
router.get("/getalldevices", DeviceController.getAllDeviceByHospitalId);
router.get("/getdevicebyhospitalid", DeviceController.getDeviceByHospitalId);
router.delete("/deletedevice", DeviceController.deleteDevice);



module.exports = router;
