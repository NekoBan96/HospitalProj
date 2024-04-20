const db = require("../db");
class DeviceController {
  async addDevice(req, res) {
    try {
      const { deviceName, deviceDescription, hospitalId } = req.body;
      const query =
        "INSERT INTO devices (device_name, hospital_id, device_desk) VALUES ($1, $2, $3) RETURNING *";
      const values = [deviceName, hospitalId, deviceDescription];
      const newDevice = await db.query(query, values);
      res.status(201).json(newDevice.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteDevice(req, res) {
    try {
      const deviceId = req.query.id;
      await db.query("DELETE FROM devices WHERE device_id = $1", [deviceId]);
      res.status(200).send("Device deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getDevices(req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = 10;
      const offset = (page - 1) * pageSize;
      const hospitals = await db.query(
        "SELECT * FROM devices LIMIT $1 OFFSET $2",
        [pageSize, offset]
      );
      res.status(200).json(hospitals.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDeviceByHospitalId(req, res) {
    try {
      const hospitalId = req.query.id;
      let devices;
      devices = await db.query("SELECT * FROM devices WHERE hospital_id = $1", [
        hospitalId,
      ]);
      res.status(200).json(devices.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getDeviceByHospitalId(req, res) {
    try {
      const hospitalId = req.query.id;
      const page = req.query.page;
      let devices;
      if (page) {
        devices = await db.query(
          "SELECT * FROM devices WHERE hospital_id = $1 LIMIT 10 OFFSET $2",
          [hospitalId, (page - 1) * 10]
        );
      } else {
        devices = await db.query(
          "SELECT * FROM devices WHERE hospital_id = $1",
          [hospitalId]
        );
      }
      res.status(200).json(devices.rows);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DeviceController();
