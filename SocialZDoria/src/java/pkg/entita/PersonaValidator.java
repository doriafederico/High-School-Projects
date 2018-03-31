package pkg.entita;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class PersonaValidator implements Validator {

    /**
     * N.B. Questo Validatore valida *solo*  istanze di Persona
     * La validazione avviene dopo la creazione di un una nuova Persona
     */
    public boolean supports(Class c) {
        return Persona.class.equals(c);
    }

    public void validate(Object obj, Errors e) {
        ValidationUtils.rejectIfEmpty(e, "nome", "nome vuoto");
        Persona p = (Persona) obj;
        if (p.getReddito()< 0) {
            e.rejectValue("reddito", "reddito negativo");
        }
    }
}