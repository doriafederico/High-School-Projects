<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title> Lista delle Persone</title>
    </head>

    <body>

        <h1>Lista delle Persone </h1>

        <br>
        <table border="1">
            <th>Numero</th>
            <th>IdPersona</th>
            <th>Nome</th>
            <th>Reddito</th>
            <th>Edit</th>	
            <th>Delete</th>
                <c:forEach var="p" items="${listaPersone}" varStatus="status" >
                <tr>
                    <td>${status.index + 1}</td>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.reddito}</td>

                    <td>
                        <a href="modificaPersona?id=${p.id}">E-></a>
                    </td>
                    <td>
                        <a href="cancellaPersona?id=${p.id}">D-></a>

                    </td>

                </tr>
            </c:forEach>  
        </table>
        <br>
        <a href="index"> home </a>
    </body>
</html>
