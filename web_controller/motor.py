from constants import DADDR
import socket


commandList = {
    "forward": "FORD",
    "left": "LEFT",
    "right": "RIGT",
    "back": "BACK",
    "stop": "STOP",
}

class Motor:
    thread_list = []
    def __init__(self, address = DADDR) -> None:
        self.address = address
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self, address = DADDR):
        self.sock.connect(address)

    def close(self):
        self.sock.close()

    def issueCommand(self, command = commandList.get("stop")):
        try:
            self.connect()
            self.send(command)
        except (e):
            print(b'Motor controller not connected and listening')
        finally:
            self.close()
            