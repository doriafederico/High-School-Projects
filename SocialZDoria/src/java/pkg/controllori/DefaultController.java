package pkg.controllori;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import pkg.dao.DaoPersona;
import pkg.entita.Persona;
import pkg.entita.PersonaValidator;

@Controller
public class DefaultController {

	@Autowired  // ricordarsi !! 
	private DaoPersona dao;

//    public void setDao(DaoPersona dao) {
//        this.dao = dao;
//    }
	//esempio di utilizzo: /persona/4
	@RequestMapping(value = "/persona/{id}", method = RequestMethod.GET)
	public String getPersona(@PathVariable int id, ModelMap map) {
		System.out.println("Richiesta Persona: " + id);
		Persona p = dao.getPersonaById(id);
		if (p == null) {
			return "personaSconosciuta";
		}
		map.addAttribute("nome", p.getNome());
		map.addAttribute("reddito", p.getReddito());
		return "datiPersona";
	}

	//esempio di utilizzo: /persona?id=4
	@RequestMapping(value = "/persona", method = RequestMethod.GET)
	public String getPersonParam(@RequestParam("id") int id, ModelMap map) {
		System.out.println("Richiesta Persona:" + id);
		Persona p = dao.getPersonaById(id);
		if (p == null) {
			return "personaSconosciuta";
		}
		map.addAttribute("nome", p.getNome());
		map.addAttribute("reddito", p.getReddito());
		return "datiPersona";
	}

	// RADICE del Sito
	@RequestMapping(value = "/")
	public String index(ModelMap map) {
		return "redirect:/index"; //reindirizza alla Home Page
	}

	// Home Page 
	@RequestMapping(value = "/index")
	public String home(ModelMap map) {
		return "index";
	}
	
    @RequestMapping(value = "/mediaRedditi")
	public String mediaRedditi(ModelMap map) {
		return "mediaRedditi";
	}

	@RequestMapping(value = "/cercaPersonaPerNome", method = RequestMethod.GET)
	public String ricercaPersonaPerNome() {
		return "moduloRicercaPersona";
	}

	@RequestMapping(value = "/cercaPersona", method = RequestMethod.GET)
	public String ricercaPersona(HttpServletRequest request, ModelMap map) {
		Persona p = dao.getPersona(request.getParameter("nome"));
		if (p == null) {
			return "personaSconosciuta";
		}
		map.addAttribute("nome", p.getNome());
		map.addAttribute("reddito", p.getReddito());
		return "datiPersona";
	}

	@RequestMapping(value = "/listaPersone")
	public String listaPersone(ModelMap map) {
		List<Persona> lst = dao.getAllPersona();
		map.addAttribute("listaPersone", lst);
		return "listaPersone";
	}

	@RequestMapping(value = "/inserimento", method = RequestMethod.GET)
	public String inserimento(ModelMap map) {
		Persona p = new Persona();
		map.addAttribute("persona", p);
		return "moduloInserimentoPersona";
	}

	@RequestMapping(value = "/inserisciPersona", method = RequestMethod.POST)
	public String inserisciPersona(@ModelAttribute Persona p, ModelMap map, BindingResult result) {
		PersonaValidator pvalidator = new PersonaValidator();
		pvalidator.validate(p, result);

		if (result.hasErrors()) {
			map.addAttribute("errore", result.getFieldError().getCodes()[3]);
			return "erroreInserimentoPersona";
		} else {
			dao.inserisciPersona(p);

			return "redirect:/listaPersone";
		}
	}

	@RequestMapping(value = "/cancellaPersona", method = RequestMethod.GET)
	public String cancellaPersona(HttpServletRequest request) {
		int idPersona = Integer.parseInt(request.getParameter("id"));
		dao.cancella(idPersona);
		return "redirect:/listaPersone";
	}

	@RequestMapping(value = "/modificaPersona", method = RequestMethod.GET)
	public String aggiornamento(HttpServletRequest request, ModelMap map) {
		int idp = Integer.parseInt(request.getParameter("id"));
		Persona p = dao.getPersonaById(idp);

		map.addAttribute("persona", p);
		return "moduloModificaPersona";

	}

	@RequestMapping(value = "/aggiornaPersona", method = RequestMethod.POST)
	public String aggiornaPersona(@ModelAttribute Persona p) {
		dao.aggiornaPersona(p);
		return "redirect:/listaPersone";
	}

	@RequestMapping(value = "/moduloAumenta", method = RequestMethod.GET)
	public String moduloAumenta() {
		return "moduloAumenta";
	}

	@RequestMapping(value = "/aumentaReddito", method = RequestMethod.GET)
	public String aumentaReddito(HttpServletRequest request, ModelMap map) {
		double aumenta = Double.parseDouble(request.getParameter("aumenta"));
		dao.aumentaReddito(aumenta);
		return "redirect:/listaPersone";

	}

}
