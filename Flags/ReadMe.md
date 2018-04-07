# Broadcast receiver (pending intent flags)
di **Farhan Latif Gazi** `5^IA`

`Il progetto Broadcast receiver (pending intent flags)` e' una modifica del Progetto AM003_BroadcastReceiver.

Tale progetto ha lo scopo di testare il comportamento dei 5 Flag del pendingintent (selezionabili tramite delle radio button).

I Flags sono i seguenti ed hanno il comportamneto descritto qui sotto.

```
- FLAG_CANCEL_CURRENT
```
Flag che indica che se il PendingIntent descritto esiste già, quello corrente dovrebbe essere cancellato prima di generarne uno nuovo.

```
- FLAG_IMMUTABLE
```
Flag che indica che il PendingIntent creato deve essere immutabile.

```
- FLAG_NO_CREATE
```
Flag che indica che se il PendingIntent descritto non esiste già, allora restituisce semplicemente null invece di crearlo.

```
- FLAG_ONE_SHOT
```
Flag che indica che questo PendingIntent può essere utilizzato solo una volta.

```
- FLAG_UPDATE_CURRENT
```
Contrassegna che indica che se il PendingIntent descritto esiste già, mantienilo ma sostituisci i suoi dati extra con ciò che è in questo nuovo Intento.

## Strumenti utilizzati per lo sviluppo del progetto

- `Android Studio`: per scrivere il codice. 
