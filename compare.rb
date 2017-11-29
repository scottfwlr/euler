DEBUG = false

arr = {}

# Goals: first 100
1.upto(100) { |n| arr[n.to_s] = {} }

# parse files 
Dir.glob('*/*') do |f|
  # filter out extraneous c and ruby files 
  unless f[/\.out/] or f[/hello.c/] or f[/bin/] or f[/Gemfile/] 
    print "#{f}... " if DEBUG
    num, lang = f[/\d+\.\w+/].split('.')
    instructions, file = File.read(f).split('<<<--->>>')
    arr[num]['instructions'] ||= instructions 
    arr[num][lang] = file.strip
    puts "done: #{arr[num][lang].length}" if DEBUG
  end
end

def exercise_template(num, subarr)
  instructions = subarr.delete('instructions')
  template = ">**Problem #{num}:** #{instructions}\n\n"
  subarr.each do |lang, str|
    template += "*#{lang}*\n"
    template += "```#{lang}\n"
    template += str
    template += "\n```\n"
  end
  template
end

