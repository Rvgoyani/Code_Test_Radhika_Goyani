const checkbox = document.querySelector('.filter-quater');
const salesColumn= document.querySelector("tr .sales");
const salesPersonColumn = document.querySelector("tr .salesPerson");

const filterQuaterData = (e) => {
    filterQuaterDataOnSorting();
}

const filterQuaterDataOnSorting = () => {
    for(var i = 1; i<=4; i++) {
        var status = document.getElementById(i + '-quater-checkbox').checked;

        if (status === false) {
            let filterValue = i + '-quater';
            filterRow = document.getElementsByClassName(filterValue);
            for(var element = 0; element < filterRow.length; element++) {
                filterRow[element].style.display = 'none';
            }
        } else {
            let filterValue = i + '-quater';
            filterRow = document.getElementsByClassName(filterValue);

            for(var element = 0; element < filterRow.length; element++) {
                filterRow[element].style.display = 'table-row';
            }
        }
    }
}

// add event on checkbox
checkbox.addEventListener('change', filterQuaterData);

// click event on sales heading
var salesColumnSortOrder = 0;
salesColumn.addEventListener('click', event => {
    salesColumnSortOrder = salesColumnSortOrder + 1;;
    salesColumnSortOrder = (salesColumnSortOrder % 3 === 0) ? 0 : salesColumnSortOrder;
    sortSalesColumn();
});

// click event on salesPerson heading
var topSalesPersonColumnSortOrder = 0;
salesPersonColumn.addEventListener('click', event => {
    topSalesPersonColumnSortOrder = topSalesPersonColumnSortOrder + 1;;
    topSalesPersonColumnSortOrder = (topSalesPersonColumnSortOrder % 3 === 0) ? 0 : topSalesPersonColumnSortOrder;
    sortTopSalesPersonColumn();
});  


var data = [
    {
        "id": 1,
        "month": "January",
        "sales": "50000.00",
        "topSalesPerson": "Angela"
    },
    {
        "id": 2,
        "month": "February",
        "sales": "10000.00",
        "topSalesPerson": "Roberto"
    },
    {
        "id": 3,
        "month": "March",
        "sales": "85000.00",
        "topSalesPerson": "Maria"
    },
    {
        "id": 4,
        "month": "April",
        "sales": "56000.00",
        "topSalesPerson": "Stacey"
    },
    {
        "id": 5,
        "month": "May",
        "sales": "68000.00",
        "topSalesPerson": "William"
    },
    {
        "id": 6,
        "month": "June",
        "sales": "32000.00",
        "topSalesPerson": "Darrel"
    },
    {
        "id": 7,
        "month": "July",
        "sales": "21000.00",
        "topSalesPerson": "Angela"
    },
    {
        "id": 8,
        "month": "August",
        "sales": "18000.00",
        "topSalesPerson": "Angela"
    },
    {
        "id": 9,
        "month": "September",
        "sales": "118000.00",
        "topSalesPerson": "Maria"
    },
    {
        "id": 10,
        "month": "October",
        "sales": "52000.00",
        "topSalesPerson": "Stacey"
    },
    {
        "id": 11,
        "month": "November",
        "sales": "87000.00",
        "topSalesPerson": "Angela"
    },
    {
        "id": 12,
        "month": "December",
        "sales": "121000.00",
        "topSalesPerson": "William"
    }
];

var quarterData = {
    "1" : ["January", "February", "March"],
    "2" : ["April", "May", "June"],
    "3" : ["July", "August", "September"],
    "4" : ["October", "November", "December"],
};

const displayData = (data) => {
    clearTableData();
    for(var i=0; i<data.length; i++) {
        tr = document.createElement('tr');

        var month = document.createElement('td');
        month.innerHTML = data[i].month;

        var sales = document.createElement('td');
        sales.innerHTML = currencyFormatter(data[i].sales);

        var topSalesPerson = document.createElement('td');
        topSalesPerson.innerHTML = data[i].topSalesPerson;

        tr.append(month);
        tr.append(sales);
        tr.append(topSalesPerson);
        tr.classList.add(getQuarterCssLabel(data[i].month));
        tr.classList.add('table-row');
        document.getElementById('sales').append(tr);
    }
};

const clearTableData = () => {
    var firstRow = document.getElementById('first-row');
    document.getElementById('sales').innerHTML = '';
    document.getElementById('sales').append(firstRow);
};

const sortSalesColumn = () => {
    var newArray = [...data];
    let arrow = document.querySelector(".fa.arrow");
    if(salesColumnSortOrder === 0){
        arrow.classList.remove("fa-arrow-up");
    }
    // 1 means Sort from lowest to highest order
    if(salesColumnSortOrder === 1) {
        arrow.classList.add("fa-arrow-down");
        newArray.sort(function(a, b) {
            return a.sales - b.sales;
        });
    } 
    // 2 means Sort from highest to lowest order
    else if(salesColumnSortOrder === 2) {
        arrow.classList.remove("fa-arrow-down");
        arrow.classList.add("fa-arrow-up");
        newArray.sort(function(a, b) {
            return b.sales - a.sales;
        });
    }

    displayData(newArray);
    filterQuaterDataOnSorting();
};

const sortTopSalesPersonColumn = () => {
    var newArray = [...data];
    if(topSalesPersonColumnSortOrder === 1) {
        newArray.sort(function(a, b) {
            return a.topSalesPerson.localeCompare(b.topSalesPerson);
        });
    } else if(topSalesPersonColumnSortOrder === 2) {
        newArray.sort(function(a, b) {
            return b.topSalesPerson.localeCompare(a.topSalesPerson);
        });
    }

    displayData(newArray);
    filterQuaterDataOnSorting();
};

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const currencyFormatter = (amount) => {
    return formatter.format(amount);
};

const getQuarterCssLabel = (monthName) => {
    var cssLableName = '';
    for(var key in quarterData) {
        if(quarterData[key].includes(monthName)) {
            return key + '-quater';
        }
    }
};
