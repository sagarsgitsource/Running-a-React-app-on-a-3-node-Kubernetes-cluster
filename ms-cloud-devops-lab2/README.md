# Lab 2 — Running a React app on a 3-node Kubernetes cluster

Name: Sagar S  
Reg no: 261100680021  
Course: CCE 5001 : DevOps for Cloud  
Docker Hub image: `<user>/hello-app:v1`

## 1. Trap 1 — the local image
Output of `kubectl get pods` and the Events from `kubectl describe pod <name>`:

```
(paste here)
```
Why it happened:

## 2. Part 1 — commands
`kubectl get pods -o wide` (3 Pods, which nodes?):

```
(paste here)
```
What happened when I deleted a Pod:

`kubectl get service hello-app` (EXTERNAL-IP):

```
(paste here)
```
Trap 4 — why the EXTERNAL-IP did not load, and why `localhost:8080` did:

## 3. Part 2 — manifest
`kubectl apply -f hello-app.yaml` output, then `kubectl get endpointslices -l kubernetes.io/service-name=hello-app`:

```
(paste here)
```
What `apply` printed after changing replicas to 4 (Deployment / Service):

Two extra fields in the generated `--dry-run=client -o yaml` output, and what they are:
1.
2.

## 4. Break it on purpose
**Trap 2 — selector typo (`helo-app`).** What I saw (EndpointSlice, browser) and why:

**Trap 3 — `targetPort: 8080`.** What I saw (EndpointSlice, browser) and why:

How the EndpointSlice tells the two apart:

## 5. Screenshot
![browser](screenshot.png)
