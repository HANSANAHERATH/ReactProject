package ReactProject.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ReactProject.SaveData;
import ReactProject.repository.CustomerInformationRepository;


@RestController
public class ControllerClass {

	
	@RequestMapping(path="/serviceCheck", method=RequestMethod.GET)
	public String serviceCheck(){
		return "this is service check";
	}
	
	@RequestMapping(path="/subcribe", method=RequestMethod.POST)
	public void subcribe(){
		SaveData savedata=new SaveData();
		savedata.save();
	}
}
