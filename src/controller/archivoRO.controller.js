import { getConnection } from "./../database/database";

const getArchivo = async (req, res) => {
    try {               
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute("SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, t.numerocomprobante, t.nombrerazonsocial, t.numerodocumento, t.monedaoperacion, t.monto, t.numerocuenta, t.numerodocumentobeneficiario, t.nombrebeneficiario, t.tipodocumentodep, t.tipodocumentoben, t.codinstrumento, t.cotizacion, t.saldocuenta, t.numerocheque, t.bancoemisor from servi_pla.depositos t");
        resultDep.rows.forEach((resultDepObj) => {                
            cantDep = cantDep + 1 ;
            Deposito.push({ 
            "item" : resultDepObj[0],
            "sucursal" : resultDepObj[1],
            "fechaOperacion" : resultDepObj[2],
            "numeroComprobante" : resultDepObj[3],
            "nombreRazonSocial" : resultDepObj[4],
            "numeroDocumento" : resultDepObj[5],
            "monedaOperacion" : resultDepObj[6],
            "monto" : resultDepObj[7],
            "numeroCuenta" : resultDepObj[8],
            "numeroDocumentoBeneficiario" : resultDepObj[9],
            "nombreBeneficiario" : resultDepObj[10],
            "tipoDocumentoDep" : resultDepObj[11],
            "tipoDocumentoBen" : resultDepObj[12],
            "codInstrumento" : resultDepObj[13],
            "cotizacion" : resultDepObj[14],
            "saldoCuenta" : resultDepObj[15],
            "numeroCheque" : resultDepObj[16],
            "bancoEmisor" : resultDepObj[17]
            });    
    
        });        

        //extraccion
        const resultExt = await connection.execute("SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.monedaoperacion,t.monto,t.numerocuenta,t.numerodocumentobeneficiario,t.nombrebeneficiario,t.tipodocumento,t.tipodocumentoben,t.codinstrumento,t.cotizacion,t.saldocuenta,t.numerocheque,t.bancoemisor from servi_pla.extraccion t");
        //for(var i= 0; i < result.length; i++) {

        //    var nombre = arrayNombres[i];
        resultExt.rows.forEach((resultExtObj) => {                
            cantExt = cantExt + 1 ;
            Extracciones.push({ 
                "item" : resultExtObj[0],
                "sucursal" : resultExtObj[1],
                "fechaOperacion" : resultExtObj[2],
                "numeroComprobante" : resultExtObj[3],
                "nombreRazonSocial" : resultExtObj[4],
                "numeroDocumento" : resultExtObj[5],
                "monedaOperacion" : resultExtObj[6],
                "monto" : resultExtObj[7],
                "numeroCuenta" : resultExtObj[8],
                "numeroDocumentoBeneficiario" : resultExtObj[9],
                "nombreBeneficiario" : resultExtObj[10],
                "tipoDocumento" : resultExtObj[11],
                "tipoDocumentoBen" : resultExtObj[12],
                "codInstrumento" : resultExtObj[13],
                "cotizacion" : resultExtObj[14],
                "saldoCuenta" : resultExtObj[15],
                "numeroCheque" : resultExtObj[16],
                "bancoEmisor" : resultExtObj[17]
            });
        }); 

        //transferencia
        const resultTrans = await connection.execute("SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursalorigen,t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.numerocuenta,t.monedaoperacion,t.monto,t.montooperacionengs,t.cotizacion,t.numerodocumentobeneficiario,t.nombrebeneficiario,t.numerocuentaotraentidad,t.tipodocumento,t.tipodocumentoben,t.codinstrumento,t.ciudad,t.motivo,t.entidadorigen,t.entidaddestino from servi_pla.transferencia t");
        resultTrans.rows.forEach((resultTransObj) => {                
            cantTran = cantTran + 1 ;
            Transferencia.push({ 
                "item" : resultTransObj[0],
                "fechaOperacion" : resultTransObj[1],
                "sucursalOrigen" : resultTransObj[2],
                "numeroComprobante" : resultTransObj[3],
                "nombreRazonSocial" : resultTransObj[4],
                "numeroDocumento" : resultTransObj[5],
                "numeroCuenta" : resultTransObj[6],
                "monedaOperacion" : resultTransObj[7],
                "monto" : resultTransObj[8],
                "montoOperacionEnGs" : resultTransObj[9],
                "cotizacion" : resultTransObj[10],
                "numeroDocumentoBeneficiario" : resultTransObj[11],
                "nombreBeneficiario" : resultTransObj[12],
                "numeroCuentaOtraEntidad" : resultTransObj[13],
                "tipoDocumento" : resultTransObj[14],
                "tipoDocumentoBen" : resultTransObj[15],
                "codInstrumento" : resultTransObj[16],
                "Ciudad" : resultTransObj[17],
                "motivo" : resultTransObj[18],
                "entidadOrigen" : resultTransObj[19],
                "entidadDestino" : resultTransObj[20]
            });
        }); 

        //cancelacion
        const resultCanc = await connection.execute("SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,t.numerocomprobante,t.nombrerazonsocialdeudor,t.numerodocumentodeudor,t.monedaoperacion,t.monto,t.cotizacion,t.montooperacionengs,t.numerodocumentoautorizado,t.nombreautorizado,t.tipodocumentodeu,t.tipodocumentoaut,t.cod_instrumento,t.motivo,t.numerocredito from servi_pla.cancelacion t");
        resultCanc.rows.forEach((resultCancObj) => {                
            cantCan = cantCan + 1 ;
            Cancelacion.push({ 
                "item" : resultCancObj[0],
                "fechaOperacion" : resultCancObj[1],
                "sucursal" : resultCancObj[2],
                "numeroComprobante" : resultCancObj[3],
                "nombreRazonSocialDeudor" : resultCancObj[4],
                "numeroDocumentoDeudor" : resultCancObj[5],
                "monedaOperacion" : resultCancObj[6],
                "monto" : resultCancObj[7],
                "cotizacion" : resultCancObj[8],
                "montoOperacionEnGs" : resultCancObj[9],
                "numeroDocumentoAutorizado" : resultCancObj[10],
                "nombreAutorizado" : resultCancObj[11],
                "tipoDocumentoDeu" : resultCancObj[12],
                "tipoDocumentoAut" : resultCancObj[13],
                "codInstrumento" : resultCancObj[14],
                "motivo" : resultCancObj[15],
                "numeroCredito" : resultCancObj[16]
            });
        }); 

        //tarjeta
        const resultTar = await connection.execute("SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,t.numerotarjeta,t.codinstrumento,t.nombretitular,t.numerodocumento,t.tipodocumento,t.montooperaciongs,t.lineacredito FROM servi_pla.tarjeta t");
        resultTar.rows.forEach((resultTarObj) => {                
            cantTar = cantTar + 1 ;
            Tarjeta.push({ 
                "item" : resultTarObj[0],
                "fechaOperacion" : resultTarObj[1],
                "sucursal" : resultTarObj[2],
                "numeroTarjeta" : resultTarObj[3],
                "codInstrumento" : resultTarObj[4],
                "nombreTitular" : resultTarObj[5],
                "numeroDocumento" : resultTarObj[6],
                "tipoDocumento" : resultTarObj[7],
                "montoOperacionGs" : resultTarObj[8],
                "lineaCredito" : resultTarObj[9]
            });
        }); 
           
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        var buff = new Buffer(JSON.stringify(objeto)).toString("base64");
        res.status(200).jsonp(buff);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getArchivoUser = async (req, res) => {
    try {      
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute(
            `SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, 
            t.numerocomprobante, t.nombrerazonsocial, t.numerodocumento, t.monedaoperacion, 
            t.monto, t.numerocuenta, t.numerodocumentobeneficiario, t.nombrebeneficiario, 
            t.tipodocumentodep, t.tipodocumentoben, t.codinstrumento, t.cotizacion, t.saldocuenta, 
            t.numerocheque, t.bancoemisor from servi_pla.depositos t where usuario = :id`, [req.params.id]);
        resultDep.rows.forEach((resultDepObj) => {                
            cantDep = cantDep + 1 ;
            Deposito.push({ 
            "Item" : resultDepObj[0],
            "sucursal" : resultDepObj[1],
            "fechaOperacion" : resultDepObj[2],
            "numeroComprobante" : resultDepObj[3],
            "nombreRazonSocial" : resultDepObj[4],
            "numeroDocumento" : resultDepObj[5],
            "monedaOperacion" : resultDepObj[6],
            "monto" : resultDepObj[7],
            "numeroCuenta" : resultDepObj[8],
            "numeroDocumentoBeneficiario" : resultDepObj[9],
            "nombreBeneficiario" : resultDepObj[10],
            "tipoDocumentoDep" : resultDepObj[11],
            "tipoDocumentoBen" : resultDepObj[12],
            "codInstrumento" : resultDepObj[13],
            "cotizacion" : resultDepObj[14],
            "saldoCuenta" : resultDepObj[15],
            "numeroCheque" : resultDepObj[16],
            "bancoEmisor" : resultDepObj[17]
            });    
    
        });                
        
        //extraccion
        const resultExt = await connection.execute(
            `SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, 
            t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.monedaoperacion,t.monto,t.numerocuenta,
            t.numerodocumentobeneficiario,t.nombrebeneficiario,t.tipodocumento,t.tipodocumentoben,t.codinstrumento,
            t.cotizacion,t.saldocuenta,t.numerocheque,t.bancoemisor from servi_pla.extraccion t where usuario = :id`, [req.params.id]);
        //for(var i= 0; i < result.length; i++) {

        //    var nombre = arrayNombres[i];
        resultExt.rows.forEach((resultExtObj) => {                
            cantExt = cantExt + 1 ;
            Extracciones.push({ 
                "Item" : resultExtObj[0],
                "sucursal" : resultExtObj[1],
                "fechaOperacion" : resultExtObj[2],
                "numeroComprobante" : resultExtObj[3],
                "nombreRazonSocial" : resultExtObj[4],
                "numeroDocumento" : resultExtObj[5],
                "monedaOperacion" : resultExtObj[6],
                "monto" : resultExtObj[7],
                "numeroCuenta" : resultExtObj[8],
                "numeroDocumentoBeneficiario" : resultExtObj[9],
                "nombreBeneficiario" : resultExtObj[10],
                "tipoDocumento" : resultExtObj[11],
                "tipoDocumentoBen" : resultExtObj[12],
                "codInstrumento" : resultExtObj[13],
                "cotizacion" : resultExtObj[14],
                "saldoCuenta" : resultExtObj[15],
                "numeroCheque" : resultExtObj[16],
                "bancoEmisor" : resultExtObj[17]
            });
        }); 

        //transferencia
        const resultTrans = await connection.execute(
            `SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursalorigen,
            t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.numerocuenta,t.monedaoperacion,t.monto,
            t.montooperacionengs,t.cotizacion,t.numerodocumentobeneficiario,t.nombrebeneficiario,t.numerocuentaotraentidad,
            t.tipodocumento,t.tipodocumentoben,t.codinstrumento,t.ciudad,t.motivo,t.entidadorigen,t.entidaddestino 
            from servi_pla.transferencia t where usuario = :id`, [req.params.id]);
        resultTrans.rows.forEach((resultTransObj) => {                
            cantTran = cantTran + 1 ;
            Transferencia.push({ 
                "Item" : resultTransObj[0],
                "fechaOperacion" : resultTransObj[1],
                "sucursalOrigen" : resultTransObj[2],
                "numeroComprobante" : resultTransObj[3],
                "nombreRazonSocial" : resultTransObj[4],
                "numeroDocumento" : resultTransObj[5],
                "numeroCuenta" : resultTransObj[6],
                "monedaOperacion" : resultTransObj[7],
                "monto" : resultTransObj[8],
                "montoOperacionEnGs" : resultTransObj[9],
                "cotizacion" : resultTransObj[10],
                "numeroDocumentoBeneficiario" : resultTransObj[11],
                "nombreBeneficiario" : resultTransObj[12],
                "numeroCuentaOtraEntidad" : resultTransObj[13],
                "tipoDocumento" : resultTransObj[14],
                "tipoDocumentoBen" : resultTransObj[15],
                "codInstrumento" : resultTransObj[16],
                "Ciudad" : resultTransObj[17],
                "motivo" : resultTransObj[18],
                "entidadOrigen" : resultTransObj[19],
                "entidadDestino" : resultTransObj[20]
            });
        }); 

        //cancelacion
        const resultCanc = await connection.execute(
            `SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,
            t.numerocomprobante,t.nombrerazonsocialdeudor,t.numerodocumentodeudor,t.monedaoperacion,t.monto,
            t.cotizacion,t.montooperacionengs,t.numerodocumentoautorizado,t.nombreautorizado,t.tipodocumentodeu,
            t.tipodocumentoaut,t.cod_instrumento,t.motivo,t.numerocredito 
            from servi_pla.cancelacion t where usuario = :id`, [req.params.id]);
        resultCanc.rows.forEach((resultCancObj) => {                
            cantCan = cantCan + 1 ;
            Cancelacion.push({ 
                "Item" : resultCancObj[0],
                "fechaOperacion" : resultCancObj[1],
                "sucursal" : resultCancObj[2],
                "numeroComprobante" : resultCancObj[3],
                "nombreRazonSocialDeudor" : resultCancObj[4],
                "numeroDocumentoDeudor" : resultCancObj[5],
                "monedaOperacion" : resultCancObj[6],
                "monto" : resultCancObj[7],
                "cotizacion" : resultCancObj[8],
                "montoOperacionEnGs" : resultCancObj[9],
                "numeroDocumentoAutorizado" : resultCancObj[10],
                "nombreAutorizado" : resultCancObj[11],
                "tipoDocumentoDeu" : resultCancObj[12],
                "tipoDocumentoAut" : resultCancObj[13],
                "cod_instrumento" : resultCancObj[14],
                "motivo" : resultCancObj[15],
                "numeroCredito" : resultCancObj[16]
            });
        }); 

        //tarjeta
        const resultTar = await connection.execute(
            `SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,
            t.numerotarjeta,t.codinstrumento,t.nombretitular,t.numerodocumento,t.tipodocumento,t.montooperaciongs,
            t.lineacredito FROM servi_pla.tarjeta t where usuario = :id`, [req.params.id]);
        resultTar.rows.forEach((resultTarObj) => {                
            cantTar = cantTar + 1 ;
            Tarjeta.push({ 
                "Item" : resultTarObj[0],
                "fechaOperacion" : resultTarObj[1],
                "sucursal" : resultTarObj[2],
                "numeroTarjeta" : resultTarObj[3],
                "codInstrumento" : resultTarObj[4],
                "nombreTitular" : resultTarObj[5],
                "numeroDocumento" : resultTarObj[6],
                "tipoDocumento" : resultTarObj[7],
                "montoOperacionGs" : resultTarObj[8],
                "lineaCredito" : resultTarObj[9]
            });
        }); 
        
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        var buff = new Buffer(JSON.stringify(objeto)).toString("base64");
        res.status(200).jsonp(buff);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

const getArchivoDes = async (req, res) => {
    try {      
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');          
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute("SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, t.numerocomprobante, t.nombrerazonsocial, t.numerodocumento, t.monedaoperacion, t.monto, t.numerocuenta, t.numerodocumentobeneficiario, t.nombrebeneficiario, t.tipodocumentodep, t.tipodocumentoben, t.codinstrumento, t.cotizacion, t.saldocuenta, t.numerocheque, t.bancoemisor from servi_pla.depositos t");
        resultDep.rows.forEach((resultDepObj) => {                
            cantDep = cantDep + 1 ;
            Deposito.push({ 
            "Item" : resultDepObj[0],
            "sucursal" : resultDepObj[1],
            "fechaOperacion" : resultDepObj[2],
            "numeroComprobante" : resultDepObj[3],
            "nombreRazonSocial" : resultDepObj[4],
            "numeroDocumento" : resultDepObj[5],
            "monedaOperacion" : resultDepObj[6],
            "monto" : resultDepObj[7],
            "numeroCuenta" : resultDepObj[8],
            "numeroDocumentoBeneficiario" : resultDepObj[9],
            "nombreBeneficiario" : resultDepObj[10],
            "tipoDocumentoDep" : resultDepObj[11],
            "tipoDocumentoBen" : resultDepObj[12],
            "codInstrumento" : resultDepObj[13],
            "cotizacion" : resultDepObj[14],
            "saldoCuenta" : resultDepObj[15],
            "numeroCheque" : resultDepObj[16],
            "bancoEmisor" : resultDepObj[17]
            });    
    
        });        

        //extraccion
        const resultExt = await connection.execute("SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.monedaoperacion,t.monto,t.numerocuenta,t.numerodocumentobeneficiario,t.nombrebeneficiario,t.tipodocumento,t.tipodocumentoben,t.codinstrumento,t.cotizacion,t.saldocuenta,t.numerocheque,t.bancoemisor from servi_pla.extraccion t");
        //for(var i= 0; i < result.length; i++) {

        //    var nombre = arrayNombres[i];
        resultExt.rows.forEach((resultExtObj) => {                
            cantExt = cantExt + 1 ;
            Extracciones.push({ 
                "Item" : resultExtObj[0],
                "sucursal" : resultExtObj[1],
                "fechaOperacion" : resultExtObj[2],
                "numeroComprobante" : resultExtObj[3],
                "nombreRazonSocial" : resultExtObj[4],
                "numeroDocumento" : resultExtObj[5],
                "monedaOperacion" : resultExtObj[6],
                "monto" : resultExtObj[7],
                "numeroCuenta" : resultExtObj[8],
                "numeroDocumentoBeneficiario" : resultExtObj[9],
                "nombreBeneficiario" : resultExtObj[10],
                "tipoDocumento" : resultExtObj[11],
                "tipoDocumentoBen" : resultExtObj[12],
                "codInstrumento" : resultExtObj[13],
                "cotizacion" : resultExtObj[14],
                "saldoCuenta" : resultExtObj[15],
                "numeroCheque" : resultExtObj[16],
                "bancoEmisor" : resultExtObj[17]
            });
        }); 

        //transferencia
        const resultTrans = await connection.execute("SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursalorigen,t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.numerocuenta,t.monedaoperacion,t.monto,t.montooperacionengs,t.cotizacion,t.numerodocumentobeneficiario,t.nombrebeneficiario,t.numerocuentaotraentidad,t.tipodocumento,t.tipodocumentoben,t.codinstrumento,t.ciudad,t.motivo,t.entidadorigen,t.entidaddestino from servi_pla.transferencia t");
        resultTrans.rows.forEach((resultTransObj) => {                
            cantTran = cantTran + 1 ;
            Transferencia.push({ 
                "Item" : resultTransObj[0],
                "fechaOperacion" : resultTransObj[1],
                "sucursalOrigen" : resultTransObj[2],
                "numeroComprobante" : resultTransObj[3],
                "nombreRazonSocial" : resultTransObj[4],
                "numeroDocumento" : resultTransObj[5],
                "numeroCuenta" : resultTransObj[6],
                "monedaOperacion" : resultTransObj[7],
                "monto" : resultTransObj[8],
                "montoOperacionEnGs" : resultTransObj[9],
                "cotizacion" : resultTransObj[10],
                "numeroDocumentoBeneficiario" : resultTransObj[11],
                "nombreBeneficiario" : resultTransObj[12],
                "numeroCuentaOtraEntidad" : resultTransObj[13],
                "tipoDocumento" : resultTransObj[14],
                "tipoDocumentoBen" : resultTransObj[15],
                "codInstrumento" : resultTransObj[16],
                "Ciudad" : resultTransObj[17],
                "motivo" : resultTransObj[18],
                "entidadOrigen" : resultTransObj[19],
                "entidadDestino" : resultTransObj[20]
            });
        }); 

        //cancelacion
        const resultCanc = await connection.execute("SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,t.numerocomprobante,t.nombrerazonsocialdeudor,t.numerodocumentodeudor,t.monedaoperacion,t.monto,t.cotizacion,t.montooperacionengs,t.numerodocumentoautorizado,t.nombreautorizado,t.tipodocumentodeu,t.tipodocumentoaut,t.cod_instrumento,t.motivo,t.numerocredito from servi_pla.cancelacion t");
        resultCanc.rows.forEach((resultCancObj) => {                
            cantCan = cantCan + 1 ;
            Cancelacion.push({ 
                "Item" : resultCancObj[0],
                "fechaOperacion" : resultCancObj[1],
                "sucursal" : resultCancObj[2],
                "numeroComprobante" : resultCancObj[3],
                "nombreRazonSocialDeudor" : resultCancObj[4],
                "numeroDocumentoDeudor" : resultCancObj[5],
                "monedaOperacion" : resultCancObj[6],
                "monto" : resultCancObj[7],
                "cotizacion" : resultCancObj[8],
                "montoOperacionEnGs" : resultCancObj[9],
                "numeroDocumentoAutorizado" : resultCancObj[10],
                "nombreAutorizado" : resultCancObj[11],
                "tipoDocumentoDeu" : resultCancObj[12],
                "tipoDocumentoAut" : resultCancObj[13],
                "cod_instrumento" : resultCancObj[14],
                "motivo" : resultCancObj[15],
                "numeroCredito" : resultCancObj[16]
            });
        }); 

        //tarjeta
        const resultTar = await connection.execute("SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,t.numerotarjeta,t.codinstrumento,t.nombretitular,t.numerodocumento,t.tipodocumento,t.montooperaciongs,t.lineacredito FROM servi_pla.tarjeta t");
        resultTar.rows.forEach((resultTarObj) => {                
            cantTar = cantTar + 1 ;
            Tarjeta.push({ 
                "Item" : resultTarObj[0],
                "fechaOperacion" : resultTarObj[1],
                "sucursal" : resultTarObj[2],
                "numeroTarjeta" : resultTarObj[3],
                "codInstrumento" : resultTarObj[4],
                "nombreTitular" : resultTarObj[5],
                "numeroDocumento" : resultTarObj[6],
                "tipoDocumento" : resultTarObj[7],
                "montoOperacionGs" : resultTarObj[8],
                "lineaCredito" : resultTarObj[9]
            });
        }); 
           
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        res.status(200).jsonp(objeto);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getArchivoUserDes = async (req, res) => {
    try {     
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); 
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute(
            `SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, 
            t.numerocomprobante, t.nombrerazonsocial, t.numerodocumento, t.monedaoperacion, 
            t.monto, t.numerocuenta, t.numerodocumentobeneficiario, t.nombrebeneficiario, 
            t.tipodocumentodep, t.tipodocumentoben, t.codinstrumento, t.cotizacion, t.saldocuenta, 
            t.numerocheque, t.bancoemisor from servi_pla.depositos t where usuario = :id`, [req.params.id]);
        resultDep.rows.forEach((resultDepObj) => {                
            cantDep = cantDep + 1 ;
            Deposito.push({ 
            "Item" : resultDepObj[0],
            "sucursal" : resultDepObj[1],
            "fechaOperacion" : resultDepObj[2],
            "numeroComprobante" : resultDepObj[3],
            "nombreRazonSocial" : resultDepObj[4],
            "numeroDocumento" : resultDepObj[5],
            "monedaOperacion" : resultDepObj[6],
            "monto" : resultDepObj[7],
            "numeroCuenta" : resultDepObj[8],
            "numeroDocumentoBeneficiario" : resultDepObj[9],
            "nombreBeneficiario" : resultDepObj[10],
            "tipoDocumentoDep" : resultDepObj[11],
            "tipoDocumentoBen" : resultDepObj[12],
            "codInstrumento" : resultDepObj[13],
            "cotizacion" : resultDepObj[14],
            "saldoCuenta" : resultDepObj[15],
            "numeroCheque" : resultDepObj[16],
            "bancoEmisor" : resultDepObj[17]
            });    
    
        });                
        
        //extraccion
        const resultExt = await connection.execute(
            `SELECT t.item, t.sucursal, to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion, 
            t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.monedaoperacion,t.monto,t.numerocuenta,
            t.numerodocumentobeneficiario,t.nombrebeneficiario,t.tipodocumento,t.tipodocumentoben,t.codinstrumento,
            t.cotizacion,t.saldocuenta,t.numerocheque,t.bancoemisor from servi_pla.extraccion t where usuario = :id`, [req.params.id]);
        resultExt.rows.forEach((resultExtObj) => {                
            cantExt = cantExt + 1 ;
            Extracciones.push({ 
                "Item" : resultExtObj[0],
                "sucursal" : resultExtObj[1],
                "fechaOperacion" : resultExtObj[2],
                "numeroComprobante" : resultExtObj[3],
                "nombreRazonSocial" : resultExtObj[4],
                "numeroDocumento" : resultExtObj[5],
                "monedaOperacion" : resultExtObj[6],
                "monto" : resultExtObj[7],
                "numeroCuenta" : resultExtObj[8],
                "numeroDocumentoBeneficiario" : resultExtObj[9],
                "nombreBeneficiario" : resultExtObj[10],
                "tipoDocumento" : resultExtObj[11],
                "tipoDocumentoBen" : resultExtObj[12],
                "codInstrumento" : resultExtObj[13],
                "cotizacion" : resultExtObj[14],
                "saldoCuenta" : resultExtObj[15],
                "numeroCheque" : resultExtObj[16],
                "bancoEmisor" : resultExtObj[17]
            });
        }); 

        //transferencia
        const resultTrans = await connection.execute(
            `SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursalorigen,
            t.numerocomprobante,t.nombrerazonsocial,t.numerodocumento,t.numerocuenta,t.monedaoperacion,t.monto,
            t.montooperacionengs,t.cotizacion,t.numerodocumentobeneficiario,t.nombrebeneficiario,t.numerocuentaotraentidad,
            t.tipodocumento,t.tipodocumentoben,t.codinstrumento,t.ciudad,t.motivo,t.entidadorigen,t.entidaddestino 
            from servi_pla.transferencia t where usuario = :id`, [req.params.id]);
        resultTrans.rows.forEach((resultTransObj) => {                
            cantTran = cantTran + 1 ;
            Transferencia.push({ 
                "Item" : resultTransObj[0],
                "fechaOperacion" : resultTransObj[1],
                "sucursalOrigen" : resultTransObj[2],
                "numeroComprobante" : resultTransObj[3],
                "nombreRazonSocial" : resultTransObj[4],
                "numeroDocumento" : resultTransObj[5],
                "numeroCuenta" : resultTransObj[6],
                "monedaOperacion" : resultTransObj[7],
                "monto" : resultTransObj[8],
                "montoOperacionEnGs" : resultTransObj[9],
                "cotizacion" : resultTransObj[10],
                "numeroDocumentoBeneficiario" : resultTransObj[11],
                "nombreBeneficiario" : resultTransObj[12],
                "numeroCuentaOtraEntidad" : resultTransObj[13],
                "tipoDocumento" : resultTransObj[14],
                "tipoDocumentoBen" : resultTransObj[15],
                "codInstrumento" : resultTransObj[16],
                "Ciudad" : resultTransObj[17],
                "motivo" : resultTransObj[18],
                "entidadOrigen" : resultTransObj[19],
                "entidadDestino" : resultTransObj[20]
            });
        }); 

        //cancelacion
        const resultCanc = await connection.execute(
            `SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,
            t.numerocomprobante,t.nombrerazonsocialdeudor,t.numerodocumentodeudor,t.monedaoperacion,t.monto,
            t.cotizacion,t.montooperacionengs,t.numerodocumentoautorizado,t.nombreautorizado,t.tipodocumentodeu,
            t.tipodocumentoaut,t.cod_instrumento,t.motivo,t.numerocredito 
            from servi_pla.cancelacion t where usuario = :id`, [req.params.id]);
        resultCanc.rows.forEach((resultCancObj) => {                
            cantCan = cantCan + 1 ;
            Cancelacion.push({ 
                "Item" : resultCancObj[0],
                "fechaOperacion" : resultCancObj[1],
                "sucursal" : resultCancObj[2],
                "numeroComprobante" : resultCancObj[3],
                "nombreRazonSocialDeudor" : resultCancObj[4],
                "numeroDocumentoDeudor" : resultCancObj[5],
                "monedaOperacion" : resultCancObj[6],
                "monto" : resultCancObj[7],
                "cotizacion" : resultCancObj[8],
                "montoOperacionEnGs" : resultCancObj[9],
                "numeroDocumentoAutorizado" : resultCancObj[10],
                "nombreAutorizado" : resultCancObj[11],
                "tipoDocumentoDeu" : resultCancObj[12],
                "tipoDocumentoAut" : resultCancObj[13],
                "cod_instrumento" : resultCancObj[14],
                "motivo" : resultCancObj[15],
                "numeroCredito" : resultCancObj[16]
            });
        }); 

        //tarjeta
        const resultTar = await connection.execute(
            `SELECT t.item,to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,t.sucursal,
            t.numerotarjeta,t.codinstrumento,t.nombretitular,t.numerodocumento,t.tipodocumento,t.montooperaciongs,
            t.lineacredito FROM servi_pla.tarjeta t where usuario = :id`, [req.params.id]);
        resultTar.rows.forEach((resultTarObj) => {                
            cantTar = cantTar + 1 ;
            Tarjeta.push({ 
                "Item" : resultTarObj[0],
                "fechaOperacion" : resultTarObj[1],
                "sucursal" : resultTarObj[2],
                "numeroTarjeta" : resultTarObj[3],
                "codInstrumento" : resultTarObj[4],
                "nombreTitular" : resultTarObj[5],
                "numeroDocumento" : resultTarObj[6],
                "tipoDocumento" : resultTarObj[7],
                "montoOperacionGs" : resultTarObj[8],
                "lineaCredito" : resultTarObj[9]
            });
        }); 
        
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        res.status(200).jsonp(objeto);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

export const methods = {
    getArchivo,
    getArchivoUser,
    getArchivoDes,    
    getArchivoUserDes
};
