const { default: mongoose } = require("mongoose");


const settingGeneralSchema = new mongoose.Schema(
    {
        websiteName:String,
        logo:String,
        email:String,
        phone: String,
        address: String,
        coppyright:String
    },{
        timestamps: true
    }
)
const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "setting-general");
module.exports = SettingGeneral;