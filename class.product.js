/**
 *
 * @param {number} id
 * @param {String} name
 * @param {number} price
 * @param {string} desc
 * @param {number} added
 * @param {number} updated
 * @param {number} [stock]
 * @constructor
 */
function Product(id, name, price, desc, added, updated, stock)
{
  this.id = id;
  this.name = name;
  this.price = price;
  this.desc = desc;
  this.added = added;
  this.updated = updated;

  if (typeof stock == "number")
    this.stock = stock;
  else
    this.stock = 0;

  this.added.writable = false;
}

Product.prototype.getId = function()
{
  return this.id;
};

Product.prototype.getName = function()
{
  return this.name;
};

Product.prototype.getPrice = function()
{
  return this.price;
};

Product.prototype.getDescription = function()
{
  return this.desc;
};

Product.prototype.getAdded = function()
{
  return this.added;
};

Product.prototype.getUpdated = function()
{
  return this.updated;
};

Product.prototype.getStock = function()
{
  return this.stock;
};

Product.prototype.setName = function(newName)
{
  if (typeof newName == "string")
  this.name = newName;
};

Product.prototype.setPrice = function(newPrice)
{
  if (typeof newPrice == "number")
    this.price = newPrice;
};

Product.prototype.setDescription = function(newDesc)
{
  if (typeof newDesc == "string")
    this.desc = newDesc;
};

Product.prototype.setUpdated = function(updated)
{
  if (typeof updated == "number")
    this.updated = updated;
};

Product.prototype.setStock = function(newStock)
{
  if (typeof newStock == "number")
    this.stock = newStock;

  this.stock = Math.max(this.stock, 0);
};

Product.prototype.addStock = function(number)
{
  if (typeof number == "number")
    this.stock += number;
};

Product.prototype.remStock = function(number)
{
  if (typeof number == "number")
    this.stock -= number;

  this.stock = Math.max(this.stock, 0);
};