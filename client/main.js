import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Images = new Mongo.Collection("images");



Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
	
Template.body.helpers({username:function(){
	if(Meteor.user()){
		return Meteor.user().username;
	}
	else{
		return "Hello anonimus";
	}
}})


Template.img.helpers({
	lists:Images.find({},{sort:{img_date:-1, rating_img:-1}}),
	getUser:function(user_id){
		var user = Meteor.users.findOne({_id:user_id});
		if(user){
			return user.username
		}
		else{
			return "anon"
		}
	}
})

Template.img.events({
	'click .aim':function(e){
		if(e.target.style.border=="1px solid black"){
			
		$(e.target).css("border","none")

		}
		else{
		$(e.target).css("border","1px solid black")
		}
	},
	'click .delete-image':function(){
		var selImage = this._id;
		$("#"+selImage).hide("slow",function(){
			Images.remove({"_id":selImage})
		})
	},
	'click .rating-js':function(e){
		var rating = $(e.currentTarget).data("userrating"),
			image_id = this.id;
		console.log(rating);
		console.log(image_id);
		Images.update({_id:image_id}, {$set:{rating_img:rating}});
	}
})
Template.add_img.events({
	'submit .add_img_form':function(e){
		var src_img = e.target.src_img.value;
		var src_alt = e.target.src_alt.value;
		console.log(src_img); 
		console.log(src_alt);
		if(Meteor.user()){
			Images.insert({
				src_:src_img,
				img_alt:src_alt,
				img_date: new Date(),
				createdBy:Meteor.user()._id
			});
		}
		e.target.src_img.value = "";
		e.target.src_alt.value = "";

		return false
	}
})