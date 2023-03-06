CREATE TABLE bms_service (bms_id INT NOT NULL AUTO_INCREMENT, 
    type VARCHAR(100) NOT NULL, 
    hardware_resources VARCHAR(500) NOT NULL, 
    item_cost INT NOT NULL, PRIMARY KEY(bms_id));

CREATE TABLE vdi_service (vdi_id INT NOT NULL AUTO_INCREMENT, 
    type VARCHAR(100) NOT NULL, 
    hardware_resources VARCHAR(500) NOT NULL, 
    item_cost INT NOT NULL, PRIMARY KEY(vdi_id));

CREATE TABLE web_hosting_service (web_id INT NOT NULL AUTO_INCREMENT, 
    type VARCHAR(100) NOT NULL, 
    hardware_resources VARCHAR(500) NOT NULL, 
    traffic VARCHAR(50) NOT NULL, 
    yearly_cost INT NOT NULL, PRIMARY KEY(web_id));

CREATE TABLE vm_service (vm_id INT NOT NULL AUTO_INCREMENT, 
    type VARCHAR(100) NOT NULL, 
    hardware_resources VARCHAR(500) NOT NULL, 
    item_cost INT NOT NULL, 
    PRIMARY KEY(vm_id));

CREATE TABLE organizational_services (id INT NOT NULL AUTO_INCREMENT,
    org_id INT NOT NULL, 
    service_id INT NOT NULL, 
    service_type VARCHAR(100) NOT NULL, 
    number_required INT, 
    csbs_required INT, 
    challenges VARCHAR(1000),
    additional_info VARCHAR(1000),
    signed_by VARCHAR(100) NOT NULL,
    signed_by_designation VARCHAR(100) NOT NULL,
    signature LONGTEXT NOT NULL, 
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(id));

CREATE TABLE infrastructure_details (id INT NOT NULL AUTO_INCREMENT,
    org_id INT NOT NULL, 
    application_name VARCHAR(100) NOT NULL, 
    operating_system VARCHAR(100) NOT NULL, 
    application_cpu VARCHAR(50) NOT NULL, 
    application_ram VARCHAR(50) NOT NULL, 
    application_storage VARCHAR(100) NOT NULL, 
    application_bandwidth VARCHAR(100) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id));

CREATE TABLE organization_details (
    org_id INT NOT NULL AUTO_INCREMENT,
    org_name VARCHAR(100) NOT NULL, 
    street_building VARCHAR(500) NOT NULL, 
    city_country VARCHAR(500) NOT NULL, 
    postal_address VARCHAR(500) NOT NULL, 
    branches VARCHAR(500) NOT NULL, 
    contact_name VARCHAR(500) NOT NULL, 
    contact_email VARCHAR(500) NOT NULL, 
    phonenumber VARCHAR(100) NOT NULL, PRIMARY KEY(org_id));


INSERT INTO bms_service (type, hardware_resources, item_cost) 
        VALUES ("PhysicalSmall", "2*CPU, 64G MEM, 2*300G SAS",  450),
                ("PhysicalLarge", "4*CPU, 128G MEM, 4*600G SAS",  1200);

INSERT INTO vdi_service (type, hardware_resources, item_cost) 
        VALUES (">=12", "2 vCP, 4GiB Memor, 60GB System Disk",  10),
                ("6 to <12", "2 vCP, 4GiB Memory, 60GB System Disk",  15),
                ("<6", "2 vCP, 4GiB Memor, 60GB System Disk",  20);

INSERT INTO web_hosting_service (type, hardware_resources, traffic, yearly_cost) 
        VALUES ("KonzaPersonalLite", "500MB Memory, 33GB System Disk, 300GB Bandwidth", "Low", 2500),
                ("KonzaPersonalStandard", "500MB Memory, 40GB System Disk, 400GB Bandwidth", "Low", 5000),
                ("KonzaPersonalEnterprise", "500GB Memory, 50GB System Disk, 500GB Bandwidth", "Low", 6000),
                ("KonzaPersonalExecutive", "500GB Memory, 70GB System Disk, 700GB Bandwidth", "Low", 8000),
                ("KonzaPersonalLite", "1GB Memory, 50GB System Disk, Unlimited Bandwidth", "High", 8500),
                ("KonzaPersonalStandard", "1.5GB Memory, 70GB System Disk, Unlimited Bandwidth", "High",1000),
                ("KonzaPersonalEnterprise", "2GB Memory, 100GB System Disk, Unlimited Bandwidth", "High",16000),
                ("KonzaPersonalExecutive", "Unlimited Memory, 150GB System Disk, Unlimited Bandwidth", "High",26000);

INSERT INTO vm_service (type, hardware_resources, item_cost) 
    VALUES ("Small", "2 vCPU, 4GiB Memory, 100GB System Disk", 18),
            ("Medium", "2 vCPU, 8GiB Memory, 120GB System Disk", 30),
            ("Medium.2", "4 vCPU, 8GiB Memory, 160GB System Disk", 50),
            ("Large", "8 vCPU, 16GiB Memory, 250GB System Disk", 90),
            ("Large.2", "12 vCPU, 24GiB Memory, 300GB System Disk", 150),
            ("Large.4", "16 vCPU, 32GiB Memory, 320GB System Disk", 180),
            ("XLarge.4", "32 vCPU, 64GiB Memory, 500GB System Disk", 380),
            ("2xlarge.2", "48 vCPU, 96GiB Memory, 920GB System Disk", 640),
            ("2xlarge.4", "50 vCPU, 128GiB Memory, 1200GB System Disk", 900),
            ("4xlarge.4", "56 vCPU, 256GiB Memory, 1800GB System Disk", 1720),
            ("8xlarge.2", "64 vCPU, 512GiB Memory, 2000GB System Disk", 2400);