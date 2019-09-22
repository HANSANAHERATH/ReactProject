package ReactProject;

import org.springframework.beans.factory.annotation.Autowired;

import ReactProject.entity.CustomerInformationEntity;
import ReactProject.repository.CustomerInformationRepository;

public class SaveData {

	@Autowired
	private CustomerInformationRepository customerInformationRepository;

	public void save(){
		CustomerInformationEntity customer =new CustomerInformationEntity();
		customer.setName("hansana");
		customer.setTitle("Mr.");
		customer.setSubcribe(true);
		
		customerInformationRepository.save(customer);
		
	}
	
}
