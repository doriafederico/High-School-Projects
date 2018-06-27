
package pkgws;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

/**
 *
 * @author Federico Doria
 */
@WebService(serviceName = "WS")
public class WS {

    /**
     * This is a sample web service operation
     */
    @WebMethod(operationName = "getHobby")
    public String hello(@WebParam(name = "hobby") String hobby) {
        System.out.println(hobby);
        String emails = DbHelper.getAllEmails(hobby);
        return emails;
    }
}
