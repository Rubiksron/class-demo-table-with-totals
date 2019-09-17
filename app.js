'use strict';

CoffeeShop.hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm' ];
CoffeeShop.allStores = [];
CoffeeShop.tableDataEl = document.getElementById('tableData');
CoffeeShop.allStoresTotal = 0;

function CoffeeShop (minCust, maxCust, cupsPerCust, locName) {
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cupsPerCust = cupsPerCust;
  this.locName = locName;
  this.hourlyCupsTotal = [];
  this.dailyCups = 0;
  CoffeeShop.allStores.push(this);
  this.generateHourlyCoffee();
}

CoffeeShop.prototype.randomCustomer = function(min, max) {
  return Math.random() * ((max - min) + 1) + min;
};

CoffeeShop.prototype.generateHourlyCoffee = function() {
  for (var i = 0; i < CoffeeShop.hours.length; i++) {
    var coffee = Math.ceil(this.cupsPerCust * CoffeeShop.prototype.randomCustomer(this.minCust, this.maxCust));
    this.hourlyCupsTotal.push(coffee);
    this.dailyCups += coffee;
    CoffeeShop.allStoresTotal += coffee;
  }
};

var renderHeaderRow = function() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  for (var i = 0; i < CoffeeShop.hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = CoffeeShop.hours[i];
    trEl.appendChild(tdEl);
  }

  var tdElem = document.createElement('td');
  tdElem.textContent = 'Total';
  trEl.appendChild(tdElem);
  CoffeeShop.tableDataEl.appendChild(trEl);
};

renderHeaderRow();

CoffeeShop.prototype.renderShopRow = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.locName;
  trEl.appendChild(tdEl);

  for (var i = 0; i < this.hourlyCupsTotal.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.hourlyCupsTotal[i];
    trEl.appendChild(tdEl);
  }

  var tdElem = document.createElement('td');
  tdElem.textContent = this.dailyCups;
  trEl.appendChild(tdElem);
  CoffeeShop.tableDataEl.appendChild(trEl);
};

function initExistingShops() {
  new CoffeeShop(48, 155, 2.2, 'Pike Place Market').renderShopRow();
  new CoffeeShop(34, 95, 3.2, 'Capitol Hill').renderShopRow();
  new CoffeeShop(12, 55, 2.2, 'Seattle Public Library').renderShopRow();
  new CoffeeShop(47, 105, 1.5, 'South Lake Union').renderShopRow();
  new CoffeeShop(79, 255, 1.1, 'Sea-Tac Airport').renderShopRow();
  new CoffeeShop(13, 55, 1.9, 'Website Sales').renderShopRow();
}

initExistingShops();
