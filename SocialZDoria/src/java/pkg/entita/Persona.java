package pkg.entita;

public class Persona {

    private int id;
    private Hobby hobby;
    private String nome;
    private int reddito;

    public Hobby getHobby() {
        return hobby;
    }

    public void setHobby(Hobby hobby) {
        this.hobby = hobby;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    /* costruttore necessario */

    public Persona() {
        id = -1;
        nome = "";
        reddito = 0;
        hobby = null;
    }
    /* costruttore di comodo, non strettamente necesario */

    public Persona(int id, String nome, int reddito, Hobby hobby) {
        this.id = id;
        this.nome = nome;
        this.reddito = reddito;
        this.hobby = hobby;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getReddito() {
        return reddito;
    }

    public void setReddito(int reddito) {
        this.reddito = reddito;
    }

}
