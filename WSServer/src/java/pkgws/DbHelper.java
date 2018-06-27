package pkgws;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 *
 * @author Federico Doria
 */
public class DbHelper {

    private static Connection conn;

    private static Connection getConnection() {
        if (conn == null) {
            try {
                Class.forName("org.sqlite.JDBC");
                conn = DriverManager.getConnection("jdbc:sqlite:C:\\Users\\Fede\\Desktop\\WSServer/SocialZ.db");
            } catch (ClassNotFoundException | SQLException ex) {
                ex.printStackTrace();
            }
        }
        return conn;
    }

    public static String getAllEmails(String hobby) {
        String ris = "";
        String sql = "SELECT UTENTE.Email "
                + "FROM PREFERENZA,HOBBY,UTENTE "
                + "WHERE UTENTE.IdUtente=PREFERENZA.IdUtente AND "
                + "PREFERENZA.IdHobby=HOBBY.IdHobby AND "
                + "HOBBY.Nome LIKE ?";
        try {
            PreparedStatement st = getConnection().prepareStatement(sql);
            st.setString(1, hobby);
            ResultSet r = st.executeQuery();
            while (r.next()) {
                ris += r.getString("Email") + "\n";
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("ris " + ris);
        return ris;
    }

}
