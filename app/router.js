'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  // login
  router.post('/api/login', controller.login.index);

  // product
  router.get('/api/products', controller.product.index);
  router.get('/api/product', controller.product.get);
  router.post('/api/product', controller.product.update);
  // 产品库存
  router.get('/api/product/inventorys', controller.productInventory.index);
  router.get('/api/product/inventory', controller.productInventory.get);
  
  // category
  router.get('/api/categorys', controller.category.index);
  router.get('/api/category', controller.category.get);
  router.post('/api/category', controller.category.update);

  // order
  router.get('/api/orders', controller.order.index);
  router.get('/api/order', controller.order.get);
  router.post('/api/order', controller.order.create);
  router.post('/api/order/printImgUpload', controller.order.printImgUpload);
  router.post('/api/order/invoiceUpload', controller.order.invoiceUpload);
  router.post('/api/order/updateStatus', controller.order.updateStatus);
  router.post('/api/order/orderPrint', controller.order.orderPrint);

  // channel
  router.get('/api/channels', controller.channel.index);
  router.get('/api/channel', controller.channel.get);
  router.post('/api/channel', controller.channel.update);

  // invoice_type
  router.get('/api/invoice-types', controller.invoiceType.index);
  router.get('/api/invoice-type', controller.invoiceType.get);
  router.post('/api/invoice-type', controller.invoiceType.update);

  // account category
  router.get('/api/account-categorys', controller.accountCategory.index);
  router.get('/api/account-category', controller.account.get);
  router.post('/api/account-category', controller.accountCategory.update);

  // account
  router.get('/api/accounts', controller.account.index);
  router.get('/api/account', controller.account.get);
  router.post('/api/account', controller.account.update);

  // attribute
  router.get('/api/attributes', controller.attribute.index);
  router.get('/api/attribute', controller.attribute.get);
  router.post('/api/attribute', controller.attribute.update);

  // attribute value
  router.get('/api/attribute-values', controller.attributeValue.index);
  router.get('/api/attribute-value', controller.attributeValue.get);
  router.post('/api/attribute-value', controller.attributeValue.update);

  // member
  router.get('/api/members', controller.member.index);
  router.get('/api/member', controller.member.get);
  router.post('/api/member', controller.member.update);

  // user
  router.get('/api/users', controller.user.index);
  router.get('/api/user', controller.user.get);
  router.post('/api/user', controller.user.update);
  router.post('/api/user/updatePassword', controller.user.updatePassword);
  router.post('/api/user/userRole', controller.user.userRole);

  // 进货单
  router.get('/api/purchase-orders', controller.purchaseOrder.index);
  router.get('/api/purchase-order', controller.purchaseOrder.get);
  router.post('/api/purchase-order', controller.purchaseOrder.update);
};
