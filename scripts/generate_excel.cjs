const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

function createCocoRiccoWorkbook() {
  const wb = XLSX.utils.book_new();

  // 1. Pestaña PEDIDOS
  const pedidosData = [
    [
      'ID_Pedido',
      'Fecha_Hora',
      'Cliente_Nombre',
      'Telefono_WhatsApp',
      'Detalle_Pedido',
      'Total_Soles',
      'Metodo_Pago',
      'Tipo_Entrega',
      'Direccion_Referencia',
      'Estado_Pedido'
    ],
    [
      'PED-1001',
      '2026-08-27 18:30',
      'Carlos Mendoza',
      '51998877665',
      '1x Fresas con Crema 8oz (Nutella, Fudge), 1x Helado en Tazón de Coco',
      20.00,
      'Yape',
      'Delivery',
      'Calle San Martín 450, Jaén',
      'Entregado'
    ],
    [
      'PED-1002',
      '2026-08-27 19:15',
      'Lucía Paredes',
      '51987654321',
      '2x Fresas con Crema 5oz (Chantilly), 1x Paleta Rellena de Leche Condensada',
      16.00,
      'Plin',
      'Recojo en Tienda',
      'Atención en local',
      'Entregado'
    ]
  ];
  const wsPedidos = XLSX.utils.aoa_to_sheet(pedidosData);
  XLSX.utils.book_append_sheet(wb, wsPedidos, 'PEDIDOS');

  // 2. Pestaña PRODUCTOS_STOCK
  const productosData = [
    ['ID_Producto', 'Categoria', 'Nombre_Producto', 'Medida_Detalle', 'Precio_Soles', 'Estado_Stock'],
    ['FRES-05', 'Fresas con Crema', 'Fresas con Crema Artesanales', 'Vaso 5 oz', 5.00, 'Disponible'],
    ['FRES-08', 'Fresas con Crema', 'Fresas con Crema Artesanales', 'Vaso 8 oz', 8.00, 'Disponible'],
    ['FRES-10', 'Fresas con Crema', 'Fresas con Crema Artesanales', 'Vaso 10 oz', 10.00, 'Disponible'],
    ['FRES-12', 'Fresas con Crema', 'Fresas con Crema Artesanales', 'Vaso 12 oz Mega', 12.00, 'Disponible'],
    ['HELD-01', 'Helados en Coco', 'Helado en Tazón de Coco Natural', 'Coco Real', 12.00, 'Disponible'],
    ['HELD-02', 'Helados en Coco', 'Helado en Coco con Jalea Maracuyá', 'Coco Real', 12.00, 'Disponible'],
    ['HELD-03', 'Helados en Copa', 'Helado Artesanal en Copa', '2 Bolas', 8.00, 'Disponible'],
    ['PALE-01', 'Paletas Rellenas', 'Paleta Rellena de Leche Condensada', 'Rellena', 6.00, 'Disponible'],
    ['PALE-02', 'Paletas Rellenas', 'Paleta Rellena de Fudge Artesanal', 'Rellena', 6.00, 'Disponible'],
    ['PALE-03', 'Paletas Rellenas', 'Paleta Tropical Mango / Aguaje', 'Fruta Natural', 6.00, 'Disponible'],
    ['PALE-04', 'Paletas Rellenas', 'Paleta de Lúcuma Cremosa', 'Con Leche', 6.00, 'Disponible']
  ];
  const wsProductos = XLSX.utils.aoa_to_sheet(productosData);
  XLSX.utils.book_append_sheet(wb, wsProductos, 'PRODUCTOS_STOCK');

  // 3. Pestaña CLIENTES
  const clientesData = [
    ['Telefono_WhatsApp', 'Nombre_Cliente', 'Direccion_Frecuente', 'Total_Pedidos', 'Ultima_Compra'],
    ['51998877665', 'Carlos Mendoza', 'Calle San Martín 450, Jaén', 1, '2026-08-27'],
    ['51987654321', 'Lucía Paredes', 'Recojo en tienda', 1, '2026-08-27']
  ];
  const wsClientes = XLSX.utils.aoa_to_sheet(clientesData);
  XLSX.utils.book_append_sheet(wb, wsClientes, 'CLIENTES');

  // 4. Pestaña CAJA_DIARIA
  const cajaData = [
    ['Fecha', 'Total_Yape', 'Total_Plin', 'Total_Efectivo', 'Total_Dia_Soles', 'Cantidad_Pedidos'],
    ['2026-08-27', 20.00, 16.00, 0.00, 36.00, 2]
  ];
  const wsCaja = XLSX.utils.aoa_to_sheet(cajaData);
  XLSX.utils.book_append_sheet(wb, wsCaja, 'CAJA_DIARIA');

  const outputPath = path.join(__dirname, '..', 'public', 'COCO_RICCO_GESTION_Y_BOT.xlsx');
  XLSX.writeFile(wb, outputPath);
  console.log('✓ Libro Excel creado exitosamente en:', outputPath);

  const directPath = 'C:\\Users\\sheyl\\Downloads\\COCO_RICCO_GESTION_Y_BOT.xlsx';
  XLSX.writeFile(wb, directPath);
  console.log('✓ Copia directa guardada en Descargas:', directPath);
}

createCocoRiccoWorkbook();
