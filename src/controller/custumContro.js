 




   const mysql = require("mysql");
const connect = require("../config /db");

const add = async (req, res) => {
  try {
    const sql =
      "create table customers(id int primary key, name VARCHAR(255), address VARCHAR(255))";
    await connect.query(sql);

    res.status(200).json({
      message: "Table created",
    });
  } catch (error) {
    res.status(400).json({
      message: "table is not cerated..",
    });
  }
};
const insert = async (req, res) => {
  try {
    var sql =
      "INSERT INTO customers (id,name, address) VALUES (4,'arun,parvez', 'rajdhani')";
    await connect.query(sql);
    res.status(200).json({
      message: "data inserted",
    });
  } catch (error) {
    res.status(400).json({
      message: "data not inserted..",
    });
  }
};
const getData = async (req, res) => {
  try {
    var sql =
      "SELECT id ,name FROM customers WHERE name LIKE '%,arun,%' or name like '%,satyam,%' or name like '%,parvez,%'or name like '%arun%'";
    await connect.query(sql, function (err, resp) {
      if (err) throw err;
      res.status(200).json({
        response: resp,
        message: "data getting sucessfully...",
      });
    });
  } catch (error) {
    res.status(400).json({
      response: null,
      message: "data not getting something wrong...",
    });
  }
};
const modifyData = async (req, res) => {
  try {
    // const sql = "UPDATE customers SET name = sanna, address=naviMumbai WHERE id=2";
    const query = `UPDATE customers
    SET name = '${req.body.name}', address= '${req.body.address}'
    WHERE id=${req.body.id};`;
    await connect.query(query, function (err, resp) {
      if (err) throw err;
      res.status(200).json({
        response: resp,
        message: "data updating sucessfully...",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: null,
      message: "data not updating something wrong...",
    });
  }
};
const remove = async (req, res) => {
  try {
    const sql = `DELETE FROM customers WHERE id=${req.body.id}`;
    await connect.query(sql, function (err, resp) {
      if (err) throw err;
      res.status(200).json({
        response: resp,
        message: "data deleted sucessfully...",
      });
    });
  } catch (error) {
    console.log(error); var mapping=  
    res.status(400).json({
      response: null,
      message: "data not deleted..",
    });
  }
};
const bulkOfData = async (req, res) => {
  try {
    const input = req.body;
    console.log(input);
    const recod = [];

    input.map((each) => {
      const output = [
        (id = each.id),
        (name = each.name),
        (address = each.address),
      ];
      recod.push(output);
    });
    console.log(recod);
    const sql = `insert into user(id,name,address) values ?`;
    const resp = await connect.query(sql, [recod]);
    console.log(resp);
    req.status(200).json({
      response: resp,
      message: "sending bulkOfData successfully",
    });
  } catch (error) {
    console.log(error);
    req.status(400).json({
      response: null,
      message: "not finding bulkOfData..",
    });
  }
};

const oneToOneDataInsertMap = async (req, res) => {
  try {
    const sql = `insert into customers (id,name,address) values(${req.body.id},'${req.body.name}','${req.body.address}');
  insert into client (c_id,c_name,email) values(${req.body.c_id},'${req.body.c_name}','${req.body.email}','${req.body.email}')`;

    const resp = await connect.query(sql, function (req, res) {
      if (err) throw err;
      console.log(resp);
    });
    if (resp) {
      console.log("data insert successfully occers");
    } else {
      console.log("data insert unsuccessfully");
    }
  } catch (error) {
    console.log(error);
    res.send("cheak onece it is wrong.......");
  }
};

const oneRecordFromJoin = async (res, req) => {
  try {
    const sql = `select * from customers as a inner joins client as d on a.c_id=d.id;`;
    const resp = await connect.query(sql, function (req, res) {
      if (err) throw err;
      if (resp) {
        console.log("record fetched successfully");
      } else {
        console.log("record are not fetched.....");
      }
    });
  } catch (error) {
    console.log(error);
    console.log("something wrong plz try onece...");
  }
};

const updateOneRecordFromJoin = async (req, res) => {
  try {
    const query = `update customers as a inner join client as d on a.id=${req.body.id} 
  and d.c_id=${req.body.u_id} set a.name='${req.body.name}',d.c_name='${req.body.c_name}'`;

    await connect.query(sql, function (err, resp) {
      if (err) throw err;
      if (resp) {
        res.send(resp);
        console.log("record updated...");
      } else {
        console.log("record is not updeted...");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteFormJoin = async (req, res) => {
  try {
    const sql = `DELETE customers, client
  FROM customers
  INNER JOIN client ON client.c_id=customers.id where customers.id=${req.body.id};`;

    await connect.query(sql, function (err, resp) {
      if (err) throw err;
      if (resp) {
        res.send(resp);
        console.log("record delete successfully");
      } else {
        console.log("record are not detele ....");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  add,
  insert,
  getData,
  modifyData,
  remove,
  bulkOfData,
  oneToOneDataInsertMap,
  oneRecordFromJoin,
  updateOneRecordFromJoin,
  deleteFormJoin,
};
