const socket=io();//for making the connection
console.log('connected');

//this is the code
if(navigator.geolocation){

    //there is the function in which there is position take the coordinates from the position ans send to socket
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },
(error)=>{
console.error(error);
},
//settings high acc. no cache ,5 sec timeout
{
    enableHighAccuracy:true,
    maximumAge:0,
    timeout:5000
}
);
}

const map=L.map("map").setView([0,0],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"@Atul"
}).addTo(map);


const marker={};

socket.on("receive-location",(data)=>{
    
    const{id,latitude,longitude}=data;
    console.log(id,latitude,longitude);
    map.setView([latitude,longitude]);
    if(marker[id]){
        marker[id].setLatLng([latitude,longitude]);
    }else{
        marker[id]=L.marker([latitude,longitude]).addTo(map);
    }
});

socket.on("user-disconnect",(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id]);
        delete marker[id];
    }
})