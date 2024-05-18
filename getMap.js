const RandomMountain = 5;
const RandomSight = 10;
function genarateMapunit() {
    room = new Object();
    room.xSize = 8;
    room.ySize = 8;
    room.field = Array.from({ length: room.xSize }, () => Array.from({ length: room.ySize }, () => 1));
    const visited = Array.from({ length: room.xSize }, () => Array.from({ length: room.ySize }, () => false));
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
    for (let i = 0; i < RandomMountain; ++i) {
        startX = Math.floor(Math.random() * room.xSize);
        startY = Math.floor(Math.random() * room.ySize);
        const queue = [];
        room.field[startX][startY] = Math.floor(Math.random() * 2 + 2);
        queue.push([startX, startY, room.field[startX][startY]]);
        visited[startX][startY] = true;

        while (queue.length > 0) {
            const [x, y, nowheight] = queue.shift();
            // console.log(x, y, room.field[x][y]);
            if (room.field[x][y] == 1) {
                choice = Math.random();
                if (choice <= 0.01) {
                    room.field[x][y] = Math.max(1, nowheight - 2);
                } else if (choice <= 0.11) {
                    room.field[x][y] = nowheight;
                } else {
                    room.field[x][y] = Math.max(1, nowheight - 1);

                }
            }
            if (room.field[x][y] == 1) {
                continue;
            }
            // Perform operations on the current field unit
            // ...

            // Explore neighboring field units
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < room.xSize && ny >= 0 && ny < room.ySize && !visited[nx][ny]) {
                    queue.push([nx, ny, room.field[x][y]]);
                    visited[nx][ny] = true;
                }
            }
        }
    }
    room.sightObj = Array.from({ length: RandomSight }, () => { })
    var use = Array.from({ length: room.xSize }, () => Array.from({ length: room.ySize }, () => false));
    for (let i = 0; i < RandomSight; ++i) {
        let now = Math.random()
        let texture = null
        if (now < 0.5) {
            let num = (Math.floor(now * 10) + 1).toString()
            now = "./object/rocks/0" + num + "/rock_0" + num + ".obj"
            texture = "./object/rocks/0" + num + "/diffuse.obj"
        } else {
            let num = (Math.floor((now - 0.5) * 10) + 1).toString()
            now = "./object/bushes/0" + num + "/bush_0" + num + ".obj"
            texture = "./object/bushes/0" + num + "/diffuse.obj"

        }
        do {
            x = Math.floor(Math.random() * room.xSize);
            y = Math.floor(Math.random() * room.ySize);
        } while (use[x][y]);
        use[x][y] = true
        // x = Math.floor(Math.random() * room.xSize)
        // y = Math.floor(Math.random() * room.ySize)
        room.sightObj[i] = {
            x: x,
            y: y,
            z: room.field[x][y] + 1,
            objPath: now,
            texturePath: texture
        };
    }
    do {
        x = Math.floor(Math.random() * room.xSize);
        y = Math.floor(Math.random() * room.ySize);
    } while (use[x][y]);
    room.keyLocation = { x: x, y: y, z: room.field[x][y] + 1 }
    room.left = -1
    room.right = -1
    room.up = -1
    room.down = -1
    return room

}
var map = []
// var nowMapIndex;
function connectMap(idx, idx2, dir) {
    switch (dir) {
        case 0:
            map[idx].up = idx2;
            map[idx2].down = idx;
            break;
        case 1:
            map[idx].down = idx2;
            map[idx2].up = idx;
            break;
        case 2:
            map[idx].left = idx2;
            map[idx2].right = idx;
            break;
        case 3:
            map[idx].right = idx2;
            map[idx2].left = idx;
            break;
        default:
            break;
    }
}
function pushMap(idx, dir) {
    map.push(genarateMapunit())
    connectMap(idx, map.length() - 1, dir);
}
function initMap() {
    map = []
    map.push(genarateMapunit())
    // nowMapIndex = 0;
}
function main() {
    initMap();
}
main()