package ReactProject.repository;

import org.springframework.data.repository.CrudRepository;

import ReactProject.entity.CustomerInformationEntity;


public interface CustomerInformationRepository extends CrudRepository<CustomerInformationEntity, Long> {

}
