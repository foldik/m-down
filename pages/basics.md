# m-down basics language support

This page shows the basic markdown syntax that you can use on your site.

In __m-down__ every file will be separated into blocks. Each block has to be separated by one new line. Don't forget it because it can cause strange errors and you won't get the expected page.

## Headers

```
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

You can create simple paragraphs by typing simple text. If you want to have separated paragraphs than you have to separate it by one new line.

This is another paragraph for example.

## Inline text styling

You can can your inline text like:

```
__This will be bold__ _and this will italic_ and this will be normal.

Or **this will be bold** *and this will italic* and this will be normal.
```

__This will be bold__ _and this will italic_ and this will be normal.

Or **this will be bold** *and this will italic* and this will be normal.

## Links

```
[Linke name](url)
```

[Linke name](url)

## List

Currently list support is limited. It doesn't support ordered list yet.

```
- This is the first item
- This is the second item
- and this is the third item
```

- This is the first item
- This is the second item
- and this is the third item

### Nested list

If you use nested lists make sure that you use only one space for the different list levels. For example:

```
- First level
- First level
 - Second level
 - Second level
- First level
 - Second level
  - Third level
- First level
```

- First level
- First level
 - Second level
 - Second level
- First level
 - Second level
  - Third level
- First level

## Coe blocks

```
 ```java
 public class Main {

   public static void main(String[] args) {
     System.out.println("Hello m-down!");
   }

 }
 ```
```

```java
public class Main {

  public static void main(String[] args) {
    System.out.println("Hello m-down!");
  }

}
```

## Images, gifs

```
![Space](images/space.jpg)
```

![Space](images/space.jpg)

```
![Space time](images/space-time.jpg)
```

![Space time](images/space-time.gif)

## Block quote

```
> This will be a simple block quote.
```

> This will be a simple block quote.
