const mongoose = require('mongoose');
const {
    Data,
    Device,
    Subscription,
    User
} = require('./index');

mongoose.connect('mongodb://127.0.0.1:27017/MyArduinoDB')
  .then(() => {
    console.log("Connected to DB");
  })

const GetDevicesPaginate = async (username,password,page_num,pagination_num) => {

  // const devices = await Subscription.find({},{})
  // .populate({
  //   path:"user",
  //   match:{
  //     username:'mainAdmin',
  //     $exists:true
  //   }
  // })
  // .populate({
  //   path:"device",
  //   select:{
  //     AUTH_ID:true
  //   }
  // })

  //   const subscriptions = await Subscription.find({},{}).populate({
  //       path:"user",
  //       match: { email: "e@com", $exists:true },
  //       select: {
  //           username:true,
  //           role:true
  //       }
  //   });
  //   console.log(devices);
    const user = await User.findOne({ username: 'user05' });
  const userDevices = await Subscription.find({ user: user._id },{_id:false,device:true})
    .populate({
      path:'device',
      select:{
        AUTH_ID:true
      }
    });

  const tableDevices = userDevices.map((device) => {
    return device['device']['AUTH_ID'];
  })
  
  console.log(tableDevices);
};

GetDevicesPaginate();