# Step

1. installare con yarn install

2. eseguire:
- ```yarn run mobile``` per far partire l'app iOS/Android
- ```yarn run web``` per far partire la web app



# Sviluppo
1. creare sempre una nuova branch, il nome della branch deve contenere l'id del ticker di Linear che state completando (es: SIV-53)

2. non creare nuovi componenti o data fetching in expo ma:
- per data fetching creare nuovi hook in packages/api
- per elementi ui creare nuovi componenti in packages/ui, ed eseguire ```yarn run rebuild-ui```