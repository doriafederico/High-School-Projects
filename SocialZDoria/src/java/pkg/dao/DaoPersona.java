/* Interfaccia DAO  (non strettamente indispensabile ma fortemente consigliata) 
   Un DAO (Data Access Object) è un oggetto che contine attributi e metodi 
   per realizzare la logica di business senza preoccuparsi di come sono 
   rappresentati i dati su supporti permanenti (DB, file , Wseb services, ecc.
*/
package pkg.dao;


import java.util.List;
import pkg.entita.Persona;


public interface DaoPersona {

    public Persona getPersonaById(int id);

    public Persona getPersona(String nome);

    public List<Persona> getAllPersona();

    public void cancella(int idPersona);

    public void inserisciPersona(Persona p);

    public void aggiornaPersona(Persona p);

    public void aumentaReddito(double aumenta);
}
