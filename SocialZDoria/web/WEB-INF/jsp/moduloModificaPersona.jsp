<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Aggiornamento di una Persona</title>
</head>
<body>
    <div align="center">
        <h1> Modifica Persona</h1>
        <form:form action="aggiornaPersona" method="post" modelAttribute="persona">
        <table>
            <form:hidden path="id"/>
            <tr>
                <td>nome:</td>
                <td><form:input path="nome" /></td>
            </tr>
            <tr>
                <td>reddito:</td>
                <td><form:input path="reddito" /></td>
            </tr>
           
            <tr>
                <td align="center" colspan="2">
                    <input type="submit" value="Aggiorna"> 
                    <input type="button" value="Annulla" onclick="window.location.href='listaPersone';">
               </td>
            </tr>
        </table>
        </form:form>
    </div>
</body>
</html>
