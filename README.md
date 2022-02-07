
# Dr. Mario Juego P5.JS

Juego desarrollado en p5.js , el juego original , el cual se basa el proyecto [Dr. Mario](https://es.wikipedia.org/wiki/Dr._Mario)


# Autores

- [Oscar Ivan Gutierrez Palacios](https://www.github.com/octokatherine)
- [Nicolas Duque](https://github.com/nikoduque-doo)


## Objetivos del proyecto
Desarrollar por medio del uso de las herramientas de la programación orientada a objetos, javascript y la libreria p5, un juego en donde se apliquen estos conceptos

Definir ciertas características específicas del juego que lo diferencian de otros juego similares
  Eliminación de conjuntos de 4 o más elementos consecutivos del mismo color
  Definir una 'gravedad' que afecte a las fichas del juego cuando no tengan un punto de apoyo debajo de ellas
  Generación al azar de los virus (celda a eliminar)
  Condiciones de pérdida y ganada


Recrear la éstetica del juego utilizando imágenes y GIFS, para facilitar animaciones y asemejarse más al juego en el que se basó el proyecto
  Uso de menús interactivos
  Pantallas diferentes para diferentes estados de juego
  Animaciones de lanzar una ficha, movimiento de virus y muerte de virus

Implementar música al juego

## Solución

Uso de dos clases:
tablero.js para el tablero
pildora.js para la ficha jugable
las dos clases son independientes, no contienen herencias

sketch.js controla el dibujo de todo el proyecto además de aspectos como la resolución y 'aspect ratio'

botones.js contiene todos los botones, teclas y demás con las que el usuario interactúa con el juego

dinámicas.js controla el gameloop, los menús, las animaciones, las pantallas de pérdida y de ganar

    
## Conclusiones
La programación orientada objetos provee herramientas que permiten visualizar de una manera más intuitiva algunos problemas de programación, sobre todo en el caso de videojuegos. La interacción entre actores y su escenario se traduce relativamente literal a este paradigma de programación, sin embargo éste es mucho más versátil cuando es utilizado en conjunto a otros paradigmas.

El uso de clases en el programa actual fue excesivo, en el sentido de que al sólo existir una instancia de cada clase, era equivalente solo crear objetos literales que podian ejercer la misma función. Las clases fueron un vestigio de una idea de tener una opción multijugador que fue desechada por problemas de tiempo.

El trabajo colaborativo permite añadir muchas más características al programa y hacer muchos más test en busca de bugs que el trabajo individual, por tanto el proyecto fue enteramente dependiente en la disposición de trabajo de ambos programadores.


## Limitaciones:
Existen ocaciones en que la parte superior de una pildora no cambia de apariencia al romperse, si bien si se comporta como tal

No hay suficientes implentaciones de las clases que justifique el uso de clases y no objetos literales

## Trabajo Futuro
Modo multijugador como aparece en el juego en el que se basó el proyecto

Bugfix para el cambio de apariencia de una píldora

Animación para eliminación de pildoras

## Demo

http://10scar.com/drmario


## Contribuciones- Librerias
Sprites del juego obtenidas de: https://co.pinterest.com/pin/336855247104581271/
Música obtenida de: https://www.royaltyfreemusicclips.com/pir/free_music_loops.shtml
Efectos de sonido obtenidos de: https://pixabay.com/sound-effects/search/game/




## Tecnologias

 - [P5 JS](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [P5 GIF](https://github.com/antiboredom/p5.gif.js/tree/master)

