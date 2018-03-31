package pkg.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import pkg.entita.Persona;
import javax.sql.DataSource;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

/**
 *
 * Implementazione dell'interfaccia DaoPersona medinate DB Il tipo, nome, ecc
 * del DB è specificato nel bean con id="dataSource" in applicationContext.xml
 *
 */
public class DaoPersonaDB implements DaoPersona {

	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
//    JdbcTemplate jdbcTemplate;
//

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public DaoPersonaDB() {

	}

	public Persona getPersonaById(int id) {

		String sql = "SELECT * FROM PERSONA WHERE idPersona=" + id;
		return jdbcTemplate.query(sql, new ResultSetExtractor<Persona>() {

			@Override
			public Persona extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				return rs.next()
						? new Persona(
								rs.getInt("IdPersona"),
								rs.getString("Nome"),
								rs.getInt("reddito"), null
						) : null;
			}
		});
	}

	public Persona getPersona(String nome) {

		String sql = "SELECT * FROM PERSONA WHERE nome='" + nome + "'";
		return jdbcTemplate.query(sql, new ResultSetExtractor<Persona>() {

			@Override
			public Persona extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				return rs.next()
						? new Persona(
								rs.getInt("IdPersona"),
								rs.getString("Nome"),
								rs.getInt("reddito"), null) : null;
			}
		});
	}

	public List<Persona> getAllPersona() {

		String sql = "SELECT * FROM PERSONA";
		List<Persona> ris = jdbcTemplate.query(sql, new RowMapper<Persona>() {
			@Override
			public Persona mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Persona(
						rs.getInt("IdPersona"),
						rs.getString("Nome"),
						rs.getInt("reddito"), null);
			}
		});
		return ris;
	}

	public void cancella(int idPersona) {
		String sql = "DELETE FROM PERSONA WHERE idPersona=?";
		jdbcTemplate.update(sql, idPersona);
	}

	public void inserisciPersona(Persona p) {

		String sql = "INSERT INTO PERSONA (nome,reddito)"
				+ " VALUES (?, ?)";
		jdbcTemplate.update(sql, p.getNome(), p.getReddito());
	}

	public void aggiornaPersona(Persona p) {
		String sql = "UPDATE PERSONA SET nome=?, reddito=? "
				+ " WHERE IdPersona=?";
		jdbcTemplate.update(sql, p.getNome(), p.getReddito(), p.getId());
	}

	@Override
	public void aumentaReddito(double aumenta) {
		String sql = "UPDATE PERSONA SET reddito=reddito*(1+?) ";
		jdbcTemplate.update(sql, aumenta / 100);
	}

}
