let list = [   
    { 	paidBy: "A", 	paidFor: { "B": 100, "C": 50 } 	},
    { 	paidBy: "A", 	paidFor: { "C": 500 } 	},
    {  	paidBy: "B", 	paidFor: { "A": 150, "C": 200 } 	},
    {  	paidBy: "C", 	paidFor: { "A": 250, "B": 200 } 	}	
]

const nodes = new Set();
for(let i=0;i<list.length;i++) {
    nodes.add(list[i].paidBy);
    const keys = Object.keys(list[i].paidFor);
    keys.forEach((key) => {
        nodes.add(key);
    });
}

let N = nodes.size;
let graph = Array(N).fill(0).map(x => Array(N).fill(0))

for(let i=0;i<list.length;i++) {
    let paidBy = list[i].paidBy;
    const keys = Object.keys(list[i].paidFor);
    keys.forEach((key, index) => {
        graph[paidBy.charCodeAt(0)-65][key.charCodeAt(0)-65] += list[i].paidFor[key];
    });
}

console.log(graph);

function minimize(amount)	{
    var maxCredit = amount.indexOf(Math.max(...amount)), maxDebit = amount.indexOf(Math.min(...amount));
	if (amount[maxCredit] == 0 && amount[maxDebit] == 0)
		return;
    var min = (-amount[maxDebit] < amount[maxCredit])?-amount[maxDebit]:amount[maxCredit];
	amount[maxCredit] -= min;
	amount[maxDebit] += min;
    console.log(`${String.fromCharCode(65 + maxCredit)} owes ${String.fromCharCode(65 + maxDebit)} ${min}`);
	minimize(amount);
}

function minTranc(graph) {
	var amount = new Array(N).fill(0);;
	for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            amount[i] += (graph[j][i] - graph[i][j]);
        }            
    }   
    if(amount.reduce( (x,y) => {return x+y}) != 0) {
        console.log("Transaction Unbalanced");
    }   
    else {
        minimize(amount);
    }	
}

minTranc(graph);