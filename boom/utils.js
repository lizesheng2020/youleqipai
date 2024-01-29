
let gameland = class {
	constructor(url, recordname) {
	    this.recordname = recordname;
	    this.url = url;
	  }
	startGame (gameID){
		return new Promise((resolve, reject)=>{
			let params = {
							type:'1',
							gameId: gameID
						}
			 this.get(this.url + 'startGame?', params, (res)=>{
				 if(res.code == 0){
					 uni.setStorageSync(this.recordname, res.data.ID);
					 resolve(res)
				 }else{
					 reject(res)
				 }
			 }, function(res){
				 reject(res)
			 })
		})
		
	}
	
	gameOver(time,score) {
		let id = parseInt(uni.getStorageSync(this.recordname))  ;
		let params = JSON.stringify({TimeNumber: time, Score:score, ID:id });
		let data = window.parent.jsencrypt.encrypt(params);
		return new Promise((resolve, reject)=>{
			this.post(this.url + 'gameOver',data, function(res){
				if(res.code == 0){
					 resolve(res)
				 }else{
					 reject(res)
				 }
			}, function(res){
				reject(res)
			})
		})
	}
	
	relive() {
		let id = uni.getStorageSync(this.recordname)
		return new Promise((resolve, reject)=>{
			this.post(this.url + 'revive?recordId=' + id, {}, function(res){
				if(res.code == 0){
					 resolve(res)
				 }else{
					 reject(res)
				 }
			}, function(res){
				reject(res)
			})
		})
		
	}
	getUserInfo(){
		return new Promise((resolve, reject)=>{
			this.get(this.url + 'user', {}, function(res){
				if(res.code == 0){
					 resolve(res)
				 }else{
					 reject(res)
				 }
				
			}, function(res){
				reject(res)
			})
		})
	}
	getConfig(){
		return new Promise((resolve, reject)=>{
			this.get(this.url + 'gameConfig', {}, function(res){
				if(res.code == 0){
					 resolve(res)
				 }else{
					 reject(res)
				 }
				
			}, function(res){
				reject(res)
			})
		})
	}
	post(url, data, cb, failCb) {
	  var xhr = new XMLHttpRequest();
	  var body = []
	  for(var i in data) {
	    body.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
	  }
	  
	  let tokenname = "token" + uni.getStorageSync("walletAddress");
	  xhr.onreadystatechange = function() {
	    if(xhr.readyState == 4 && xhr.status >= 200) {
	      var resp = xhr.responseText
	      cb(JSON.parse(resp))
	    } else if (failCb) {
	      failCb()
	    }
	  }
	  xhr.open("POST", url, true);
	  xhr.setRequestHeader("x-token", uni.getStorageSync(tokenname));
	  xhr.setRequestHeader("Content-Type", "application/json");
	  // xhr.send(body.join('&'));
	  xhr.send(data);
	}
	
	get(url, data, cb, failCb) {
	  var xhr = new XMLHttpRequest();
	  var body = []
	  let newurl = url;
	  for(var i in data) {
	    newurl = newurl + i + '=' + data[i] + '&';
	  }
	  
	  let tokenname = "token" + uni.getStorageSync("walletAddress");
	  xhr.onreadystatechange = function() {
		  console.log(xhr.readyState, xhr.status)
	    if(xhr.readyState == 4 && xhr.status >= 200) {
	      var resp = xhr.responseText
	      cb(JSON.parse(resp))
	    } else if (failCb) {
	      failCb()
	    }
	  }
	  xhr.open("GET", newurl, true);
	  xhr.setRequestHeader("x-token", uni.getStorageSync(tokenname));
	  xhr.setRequestHeader("Content-Type", "application/json");
	  // xhr.send(body.join('&'));
	  xhr.send(data);
	}
}







