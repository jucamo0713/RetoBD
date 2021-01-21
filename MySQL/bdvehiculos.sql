DROP DATABASE IF EXISTS `bdvehiculos`;
CREATE DATABASE IF NOT EXISTS `bdvehiculos`;
USE `bdvehiculos`;
CREATE TABLE modelo (
  modelo int(4) NOT NULL PRIMARY KEY
);

INSERT INTO modelo (modelo) VALUES
(1990),
(1991),
(1992),
(1993),
(1994),
(1995),
(1996),
(1997),
(1998),
(1999),
(2000),
(2001),
(2002),
(2003),
(2004),
(2005),
(2006),
(2007),
(2008),
(2009),
(2010),
(2011),
(2012),
(2013),
(2014),
(2015),
(2016),
(2017),
(2018),
(2019),
(2020),
(2021);

CREATE TABLE tipo_linea (
  id_linea bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  desc_linea text COMMENT 'VALOR CON POSIBILIDAD DE NULL EN CASO DE NO EXISTIR DESCRIPCION O INFORMACION DE LA LINEA',
  id_marca bigint(20) NOT NULL,
  activo enum('S','N') NOT NULL
);

INSERT INTO `tipo_linea` (`id_linea`, `desc_linea`, `id_marca`, `activo`) VALUES
(1, 'Captiva', 1, 'S'),
(2, 'Ls300', 2, 'N'),
(3, 'A4', 3, 'S'),
(4, 'Escalade', 4, 'N'),
(5, 'Turbo', 5, 'S'),
(6, 'Trans Sport', 1, 'N'),
(7, 'Rx', 2, 'S'),
(8, 'A6', 3, 'N'),
(9, 'Bls', 4, 'S'),
(10, 'Azure', 5, 'N'),
(11, 'Astro', 1, 'S'),
(12, 'Gs460', 2, 'N'),
(13, 'Coupe', 3, 'S'),
(14, 'El Dorado', 4, 'N'),
(15, 'Continental Gt', 5, 'S'),
(16, 'Corvette', 1, 'N'),
(17, 'Gs350', 2, 'S'),
(18, 'Rs4', 3, 'N'),
(19, 'Seville', 4, 'S'),
(20, 'Eight', 5, 'N');

CREATE TABLE `tipo_marca` (
  `id_marca` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `desc_marca` text COMMENT 'VALOR CON POSIBILIDAD DE NULL EN CASO DE NO EXISTIR DESCRIPCION O INFORMACION DE LA MARCA',
  `activo` enum('S','N') NOT NULL
);

INSERT INTO `tipo_marca` (`id_marca`, `desc_marca`, `activo`) VALUES
(1, 'Chevrolet', 'S'),
(2, 'Lexus', 'N'),
(3, 'Audi', 'S'),
(4, 'Cadillac', 'N'),
(5, 'Bentley', 'S');

CREATE TABLE `vehiculos` (
  `nro_placa` varchar(7) NOT NULL COMMENT 'AAA-000',
  `id_linea` bigint(20) NOT NULL,
  `modelo` int(4) NOT NULL,
  `fecha_ven_seguro` date NOT NULL,
  `fecha_ven_tecnomecanica` date NOT NULL,
  `fecha_ven_contratodo` date DEFAULT NULL COMMENT 'PERMITE NULL EN CASO DE NO POSEER ESTE SEGURO'
);

INSERT INTO `vehiculos` (`nro_placa`, `id_linea`, `modelo`, `fecha_ven_seguro`, `fecha_ven_tecnomecanica`, `fecha_ven_contratodo`) VALUES
('AAA-435', 6, 1999, '2027-08-02', '2024-05-02', '2030-10-27'),
('ABG-876', 17, 2000, '2021-03-22', '2024-04-15', '2028-02-10'),
('ANI-162', 11, 1998, '2026-03-04', '2022-12-21', '2028-09-04'),
('AVE-861', 2, 2002, '2029-05-27', '2028-01-21', '2027-12-02'),
('BJD-953', 11, 2003, '2025-11-09', '2027-09-14', '2023-07-05'),
('CAE-313', 11, 1999, '2029-06-15', '2024-04-06', '2022-12-19'),
('CAI-890', 17, 2017, '2029-07-08', '2027-07-22', '2023-10-16'),
('CHA-762', 9, 2020, '2026-12-07', '2022-11-04', NULL),
('CNO-014', 2, 2001, '2027-05-21', '2027-12-27', '2029-09-26'),
('CON-831', 4, 2021, '2026-08-22', '2029-12-08', '2024-02-11'),
('DLI-000', 4, 1993, '2022-03-13', '2028-06-06', '2025-07-15'),
('ECH-141', 3, 2005, '2022-02-27', '2026-02-20', '2022-09-08'),
('EGU-616', 13, 2020, '2029-09-24', '2021-07-20', '2029-06-18'),
('ELO-865', 17, 2012, '2022-04-03', '2026-10-04', '2023-08-12'),
('ENS-418', 10, 2009, '2027-06-07', '2027-12-21', '2029-11-03'),
('FEC-422', 6, 1992, '2025-05-05', '2028-04-08', '2024-02-08'),
('HAV-301', 1, 2000, '2026-10-11', '2024-11-06', '2023-09-26'),
('LOS-165', 20, 2020, '2029-05-07', '2021-06-09', '2022-08-27'),
('MEC-186', 8, 1995, '2027-08-13', '2023-09-06', '2027-07-23'),
('MOD-563', 17, 2002, '2026-07-27', '2024-06-18', '2027-08-06'),
('NEA-999', 17, 2013, '2023-08-20', '2026-11-18', '2025-04-25'),
('NRO-423', 12, 2014, '2023-08-22', '2029-01-14', '2024-05-22'),
('NTE-623', 5, 2017, '2027-01-27', '2027-08-01', '2023-11-27'),
('PIU-754', 2, 2016, '2022-10-27', '2024-11-10', NULL),
('PLA-098', 16, 2006, '2023-09-24', '2022-03-11', '2024-06-13'),
('POR-325', 7, 2007, '2028-04-25', '2028-04-24', '2026-01-14'),
('RES-032', 9, 2012, '2023-01-12', '2030-08-14', '2024-01-10'),
('ROF-230', 15, 2017, '2022-12-14', '2026-04-19', '2026-07-11'),
('TRA-376', 13, 1990, '2022-09-10', '2025-11-16', NULL),
('VEN-145', 17, 1991, '2026-07-07', '2025-07-09', '2029-05-07');

ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`nro_placa`);

ALTER TABLE `tipo_linea`
  ADD CONSTRAINT `fk_marca` FOREIGN KEY (`id_marca`) REFERENCES `tipo_marca` (`id_marca`) ON DELETE CASCADE ON UPDATE RESTRICT;

ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_linea` FOREIGN KEY (`id_linea`) REFERENCES `tipo_linea` (`id_linea`) ON DELETE CASCADE ON UPDATE RESTRICT;