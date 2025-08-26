const { getPool } = require("../db");  

const getLevels = async (req, res) => { 
    const db = await getPool();  
    const q = "SELECT id, title, points FROM levels";
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.send(data);
    })
};
   
const getLevelByID = async (req, res) => {   
    const db = await getPool();
    const levelId = req.params.id;
    const q = "SELECT id, title, hint, picture, points, link FROM levels WHERE id = ?";
      
    db.query(q, [levelId],(error, data) => {   
        if(error) return res.json("error");
        return res.json(data);
    })
};

module.exports = {
    getLevels,
    getLevelByID
};