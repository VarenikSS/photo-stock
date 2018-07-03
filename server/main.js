import { Meteor } from 'meteor/meteor';

Images = new Mongo.Collection("images");
	

Meteor.startup(() => {
  if(Images.find().count()==0){
  	for(var i=1;i<23;i++){
	  	Images.insert(
	  		{ src_: 'img_'+i+'.jpg' }
	  	);	
  	}
  }

console.log("main.js "+Images.find().count());
});
