# Setup
```
make
```
# Working with stack
## Viewing logs
```
docker logs [container_name] [options]
```

Exampe: Xem logs của api

```
docker logs api -f
```

## Restarting a single contrainer
```
docker restart [container_name]
```

## Restarting entire stack

```
make
```

## Running a command inside a container

Example:

```
docker exec -it api /bin/ash

(inside container shell)
npm install abcxyz

(to leave container shell)
Ctrl+P+Q
````

