DEBUG = true

arr = {}

# Goals: first 100
1.upto(100) { |n| arr[n.to_s] = {} }


Dir.glob('*/*') do |f|
  # filter out extraneous c and ruby files 
  unless f[/\.out/] or f[/hello.c/] or f[/bin/] or f[/Gemfile/] 
    print "#{f}... " if DEBUG
    num, lang = f[/\d+\.\w+/].split('.')
    instructions, file = File.read(f).split('<<<--->>>')
    arr[num]['instructions'] ||= instructions 
    arr[num][lang] = file
    puts "done" if DEBUG
  end
end
