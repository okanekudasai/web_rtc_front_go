<template>
  <div>
    방이름:<input id="roomName" /><button @click="makeRoom">방만들기</button><br>
    <button @click="tempButton">임시 버튼</button>
    <hr>
    <h3>방목록</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            conn: undefined,
            room_list: []
        }
    },
    created() {
        // 서버와 웹소켓 연결을 시도해요
        this.conn = new WebSocket('ws://localhost:9998/socket');
        console.log("웹소켓 연결을 시도 했어요. 앞이 에러가 있다면 안된거에요");

        this.conn.onopen = function() {
            axios.post("http://localhost:9998/here", "lobby", {headers: {"Content-Type": "text/plain"}});
        }

        // 웹소켓 서버에서 메세지가 오면 실행되는 이벤트 핸들러에요 도착하는 메세지는 msg에 string 형식으로 담겨있어요
        // msg를 json으로 바꿔서 활용할게요
        this.conn.onmessage = async function(msg) {
            var content = JSON.parse(msg.data);
            console.log(content);
        }
    },
    methods: {
        tempButton() {
            alert("뭔가 실험할려고 만드는 버튼이에요");
            this.conn.close();
        },
        send(message) {
            this.conn.send(JSON.stringify(message));
        },
        makeRoom() {
            var nickName = prompt("별명을 정해주세요");
            // 만들 방 이름을 서버에 전송해 줘요
            this.send({"event": "makeRoom", "roomName": document.getElementById("roomName").value, "nickName": nickName});
        }
    },
};
</script>

<style>
</style>