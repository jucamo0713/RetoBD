const { Router } = require('express');
const mysql = require('./../DB/database');
const router = Router();

//gets
router.get('/', async (req, res) => {
    return res.json({"mensaje":"mensaje"});
});
router.get('/cont_marcas', async (req, res) => {
    const [rows] = await mysql.promise().query('SELECT COUNT(*) AS conteo_marca FROM tipo_marca');
    return res.json(rows);
});
router.get('/cont_lineas', async (req, res) => {
    const [rows] = await mysql.promise().query('SELECT COUNT(*) AS conteo_lineas FROM tipo_linea');
    return res.json(rows);
});
router.get('/cont_vehiculos', async (req, res) => {
    const [rows] = await mysql.promise().query('SELECT COUNT(*) AS conteo_vehiculos FROM vehiculos');
    return res.json(rows);
});
router.get('/max_modelos', async (req, res) => {
    const [rows] = await mysql.promise().query('SELECT modelo,MAX(cantidad) AS cantidad FROM(SELECT modelo, COUNT(modelo) AS cantidad FROM vehiculos GROUP BY vehiculos.modelo) AS MAXIMO');
    return res.json(rows);
});
router.get('/min_modelos', async (req, res) => {
    const [rows] = await mysql.promise().query('SELECT modelo,MIN(cantidad) AS cantidad FROM(SELECT modelo, COUNT(modelo) AS cantidad FROM vehiculos GROUP BY vehiculos.modelo) AS MINIMO');
    return res.json(rows);
});
router.get('/descripcion_cantidades', async (req, res) => {
    const [rows] = await mysql.promise().query('SELECT desc_linea, desc_marca, COUNT(tipo_linea.id_marca) AS cantidad FROM tipo_linea JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca GROUP BY tipo_linea.id_marca');
    return res.json(rows);
});
router.get('/rango_seguro', async (req, res) => {
    const { inicio, fin } = req.body;
    const [rows] = await mysql.promise().query('SELECT nro_placa, fecha_ven_seguro FROM vehiculos WHERE fecha_ven_seguro<=DATE(' + fin + ') AND fecha_ven_seguro>=DATE(' + inicio + ')');
    return res.json(rows);
});
router.get('/rango_modelo', async (req, res) => {
    const { inicio, fin } = req.body;
    const [rows] = await mysql.promise().query(`SELECT nro_placa, modelo FROM vehiculos WHERE modelo<=${fin} AND fecha_ven_seguro>=${inicio}`);
    return res.json(rows);
});
router.get('/vehiculos', async (req, res) => {
    const [rows] = await mysql.promise().query(`SELECT vehiculos.nro_placa, vehiculos.modelo, tipo_linea.desc_linea, tipo_marca.desc_marca FROM vehiculos JOIN tipo_linea ON vehiculos.id_linea=tipo_linea.id_linea JOIN tipo_marca ON tipo_linea.id_marca= tipo_marca.id_marca`);
    return res.json(rows);
});
router.get('/sum_modelos', async (req, res) => {
    const [rows] = await mysql.promise().query(`SELECT SUM(modelo) AS suma_modelos FROM vehiculos`);
    return res.json(rows);
});
router.get('/promedio_modelos', async (req, res) => {
    const [rows] = await mysql.promise().query(`SELECT AVG(modelo) AS promedio_modelos FROM vehiculos`);
    return res.json(rows);
});
router.get('/conteoxactividad', async (req, res) => {
    const [rows] = await mysql.promise().query(`SELECT activo,COUNT(*) AS cantidad FROM tipo_linea GROUP BY activo`);
    return res.json(rows);
});
router.get('/vehiculosLEFT', async (req, res) => {
    const [rows] = await mysql.promise().query(`SELECT vehiculos.nro_placa, vehiculos.modelo, tipo_linea.desc_linea, tipo_marca.desc_marca FROM vehiculos LEFT JOIN tipo_linea ON vehiculos.id_linea=tipo_linea.id_linea LEFT JOIN tipo_marca ON tipo_linea.id_marca= tipo_marca.id_marca`);
    return res.json(rows);
});

router.get('/completo', async (req, res) => {
    const [rows] = await mysql.promise().query(`SELECT
    vehiculos.nro_placa,
    vehiculos.modelo,
    tipo_linea.id_linea,
    tipo_linea.desc_linea,
    CASE WHEN tipo_linea.activo = 'S' THEN 'activo' WHEN tipo_linea.activo = 'N' THEN 'inactivo'
END AS linea_activa,
tipo_marca.id_marca,
tipo_marca.desc_marca,
CASE WHEN tipo_marca.activo = 'S' THEN 'activo' WHEN tipo_marca.activo = 'N' THEN 'inactivo'
END AS marca_activa,
DATE_FORMAT(
    CAST(
        vehiculos.fecha_ven_seguro AS DATETIME
    ),
    "%d/%m/%Y %H:%i:%s"
) AS fecha_ven_seguro,
DATE_FORMAT(
    CAST(
        vehiculos.fecha_ven_tecnomecanica AS DATETIME
    ),
    "%d/%m/%Y %H:%i:%s"
) AS fecha_ven_tecnomecanica,
DATE_FORMAT(
    CAST(
        vehiculos.fecha_ven_contratodo AS DATETIME
    ),
    "%d/%m/%Y %H:%i:%s"
) AS fecha_ven_contratodo
FROM
    vehiculos
JOIN tipo_linea ON vehiculos.id_linea = tipo_linea.id_linea
JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca
WHERE NOT(vehiculos.modelo is NULL OR tipo_marca.desc_marca is NULL OR tipo_linea.desc_linea is NULL OR vehiculos.fecha_ven_contratodo is NULL)`);
    return res.json(rows);
});
//posts
router.post('/post_marca', async (req, res) => {
    const { descripcion, activo } = req.body;
    try {
        const y = await mysql.promise().query(`INSERT INTO tipo_marca(desc_marca, activo) VALUES (${descripcion ? "'" + descripcion + "'" : null},'${activo}')`);
        return res.json(y);
    } catch (err) {
        return res.json(err);
    }
});
router.post('/post_linea', async (req, res) => {
    const { descripcion, id_marca, activo } = req.body;
    try {
        const y = await mysql.promise().query(`INSERT INTO tipo_linea(desc_linea,id_marca, activo) VALUES ('${descripcion ? "'" + descripcion + "'" : null}',${id_marca},'${activo}')`);
        return res.json(y);
    } catch (err) {
        return res.json(err);
    }
});
router.post('/post_vehiculo', async (req, res) => {
    const { placa, id_linea, modelo, vencimiento_seguro, vencimiento_tecnomecanica, vencimiento_contratodo } = req.body;
    try {
        const y = await mysql.promise().query(`INSERT INTO vehiculos(nro_placa,id_linea,modelo,fecha_ven_seguro,fecha_ven_tecnomecanica,fecha_ven_contratodo) VALUES ('${placa.toUpperCase()}', ${id_linea}, ${modelo},DATE('${vencimiento_seguro}'), DATE('${vencimiento_tecnomecanica}'), ${vencimiento_contratodo ? "DATE('" + vencimiento_contratodo + "')" : null})`);
        return res.json(y);
    } catch (err) {
        return res.json(err);
    }
});
//Puts
router.put('/put_estado/:id', async (req, res) => {
    const { id } = req.params;
    const { estado, cambiar } = req.body;
    try {
        const rows = await mysql.promise().query(`UPDATE tipo_${cambiar} SET activo='${estado}' WHERE id_${cambiar}='${id}'`);
        return res.json(rows);
    } catch (err) {
        return res.json(err);
    }
});
// deltes
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await mysql.promise().query(`DELETE FROM tipo_marca WHERE id_marca=${id}`);
        return res.json(rows);
    } catch (err) {
        return res.json(err);
    }
});
module.exports = router;