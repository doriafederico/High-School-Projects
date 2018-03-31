<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Inserimento Nuova Persona</title>
</head>
<body>
    <div align="center">
        <h1> Inserimento Nuova Persona</h1>
        <form:form action="inserisciPersona" method="post" modelAttribute="persona">
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
                <td colspan="2" align="center"><input type="submit" value="Inserisci"></td>
            </tr>
        </table>
        </form:form>
    </div>
</body>
</html>
